"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Close, Gauge, Layers, Logout, Menu, Receipt, Shop } from "@/components/admin/icons";
import { signOut } from "@/lib/auth/actions";

/* A count is information; a bare dot on a nav row reads as "needs attention"
   when the fill and aria-current already say "you are here". */
export function AdminShell({
  children,
  openOrders,
  needingRestock,
}: {
  children: React.ReactNode;
  /* counted from the database by the layout, so the badges track the shop
     rather than a constant that was true when the file was written */
  openOrders: number;
  needingRestock: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NAV = [
    { label: "Overview", href: "/admin", icon: Gauge, count: 0 },
    { label: "Products", href: "/admin/products", icon: Box, count: 0 },
    { label: "Inventory", href: "/admin/inventory", icon: Layers, count: needingRestock },
    { label: "Orders", href: "/admin/orders", icon: Receipt, count: openOrders },
  ] as const;

  const isCurrent = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Admin sections">
      {NAV.map(({ label, href, icon: Icon, count }) => {
        const on = isCurrent(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={on ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              on
                ? "bg-cream/12 font-medium text-cream"
                : "text-cream/70 hover:bg-cream/8 hover:text-cream"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {label}
            {count > 0 && (
              <span className="ml-auto rounded-full bg-orange px-1.5 py-0.5 text-xs font-semibold text-plum-deep">
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-adm-bg text-plum">
      {/* the second neutral layer: a shell distinct from the content ground */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-shell p-4 lg:flex">
        <Link href="/admin" className="mb-7 mt-2 block px-2">
          <Image
            src="/klik-mark.png"
            alt="Klik"
            width={439}
            height={270}
            loading="eager"
            className="h-7 w-auto"
          />
          <span className="adm-label mt-2.5 block text-cream/55">Shop admin</span>
        </Link>

        {nav}

        <div className="mt-auto space-y-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-cream/70 transition-colors hover:bg-cream/8 hover:text-cream"
          >
            <Shop className="h-[18px] w-[18px]" />
            View the shop
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-cream/70 transition-colors hover:bg-cream/8 hover:text-cream"
            >
              <Logout className="h-[18px] w-[18px]" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* mobile drawer — a real overlay, not a squeezed sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-plum-deep/50"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-shell p-4">
            <div className="mb-7 mt-1 flex items-center justify-between px-2">
              <Image
                src="/klik-mark.png"
                alt="Klik"
                width={439}
                height={270}
                className="h-7 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-cream/70 hover:bg-cream/10 hover:text-cream"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>
            {nav}
            <Link
              href="/"
              className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-cream/70 hover:bg-cream/8 hover:text-cream"
            >
              <Shop className="h-[18px] w-[18px]" />
              View the shop
            </Link>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-adm-line bg-adm-surface/95 px-4 py-3 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="adm-btn adm-btn-secondary px-2.5 py-2 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* the catalogue and orders are real now; what is still missing is
              payment, so that is what the badge discloses */}
          <p className="adm-label ml-auto rounded-full border border-dashed border-plum/30 px-3 py-1.5 text-plum/70">
            Live data · payments not connected
          </p>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
