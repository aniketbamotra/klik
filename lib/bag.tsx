"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { Piece } from "@/lib/catalog";

/* The bag is the one part of the shop that works with no account at all. It is
   quantities keyed by slug, held in localStorage, and it belongs to the browser
   rather than to a user — a guest fills it, and it survives them signing in.

   Prices are never stored here. They are resolved from the catalogue the server
   fetched, so a bag can never disagree with the shop, and a stale localStorage
   entry can never decide what something costs. Checkout re-prices everything
   server-side anyway; this is only what the buyer is shown.

   Held in a module-level store read through useSyncExternalStore rather than
   hydrated inside an effect: the server snapshot is empty, the client snapshot
   is real, and React reconciles them without a cascading second render. */

const KEY = "klik.bag.v1";

type Lines = Record<string, number>;

const EMPTY: Lines = {};

let snapshot: Lines = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitise(raw: unknown): Lines {
  if (!raw || typeof raw !== "object") return EMPTY;
  const out: Lines = {};
  for (const [slug, qty] of Object.entries(raw as Record<string, unknown>)) {
    const n = Math.floor(Number(qty));
    if (slug && Number.isFinite(n) && n > 0) out[slug] = Math.min(99, n);
  }
  return out;
}

function read(): Lines {
  if (loaded) return snapshot;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    snapshot = raw ? sanitise(JSON.parse(raw)) : EMPTY;
  } catch {
    // a corrupt or unavailable store is not worth failing the page over
    snapshot = EMPTY;
  }
  return snapshot;
}

function write(next: Lines) {
  snapshot = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode, quota — the bag still works for this session */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  // another tab changing the bag should update this one
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      read();
      listeners.forEach((x) => x());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
};

const getServerSnapshot = () => EMPTY;

/* The catalogue arrives from the server through the provider, so client
   components can price a bag line without fetching anything themselves. */
const CatalogContext = createContext<Piece[]>([]);

export function BagProvider({
  pieces,
  children,
}: {
  pieces: Piece[];
  children: React.ReactNode;
}) {
  return <CatalogContext value={pieces}>{children}</CatalogContext>;
}

/** The shop as this page knows it. Client components read it from context
 *  rather than importing a constant that no longer exists. */
export function useCatalog() {
  return useContext(CatalogContext);
}

export function useBag() {
  const pieces = useCatalog();
  const lines = useSyncExternalStore(subscribe, read, getServerSnapshot);

  const add = useCallback((slug: string, qty = 1) => {
    write({ ...snapshot, [slug]: Math.min(99, (snapshot[slug] ?? 0) + qty) });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const next = { ...snapshot };
    if (qty <= 0) delete next[slug];
    else next[slug] = Math.min(99, Math.floor(qty));
    write(next);
  }, []);

  const remove = useCallback((slug: string) => {
    const next = { ...snapshot };
    delete next[slug];
    write(next);
  }, []);

  const clear = useCallback(() => write({}), []);

  return useMemo(() => {
    /* A slug the shop no longer sells is dropped from what the bag shows but
       left in storage: it may be a piece the admin has only temporarily
       archived, and silently deleting someone's bag is worse than not showing
       a line. */
    const items = Object.entries(lines)
      .map(([slug, qty]) => ({ piece: pieces.find((p) => p.slug === slug), qty }))
      .filter((x): x is { piece: Piece; qty: number } => Boolean(x.piece));

    return {
      lines,
      items,
      count: items.reduce((n, x) => n + x.qty, 0),
      subtotal: items.reduce((n, x) => n + x.piece.price * x.qty, 0),
      /** lines asking for more than the shop has left */
      overstocked: items.filter((x) => x.qty > x.piece.stock),
      /* the server snapshot is empty, so anything rendering a count still
         waits for the client snapshot before committing to a number */
      ready: lines !== EMPTY || loaded,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, pieces, add, setQty, remove, clear]);
}
