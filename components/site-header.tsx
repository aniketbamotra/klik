"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bag, Search, User } from "@/components/icons";
import { useBag, useCatalog } from "@/lib/bag";
import { shapeLine, spell } from "@/lib/catalog";

const NAV = [
  ["Jewellery", "/shop/jewellery"],
  ["For the house", "/shop/house"],
  ["Everything", "/shop"],
] as const;

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  const { count, ready } = useBag();
  const pieces = useCatalog();
  const pathname = usePathname();

  const isCurrent = (href: string) =>
    href === "/shop" ? pathname === "/shop" : pathname.startsWith(href);

  return (
    <>
      {/* counts spelled from the catalogue — a bar that says fourteen while
          the shop holds fifteen is the first thing a visitor catches */}
      <div className="bg-plum px-4 py-2.5 text-center text-xs uppercase tracking-[0.14em] text-cream/85">
        {spell(pieces.length)} pieces · {shapeLine(pieces)}
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center gap-6 px-4 sm:px-6">
          <Link href="/" aria-label="Klik — home" className="shrink-0">
            <Image
              src="/klik-lockup.png"
              alt="Klik"
              width={435}
              height={266}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 pl-4 md:flex">
            {NAV.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
                className={`text-sm font-medium transition-opacity hover:opacity-60 ${
                  isCurrent(href) ? "underline decoration-orange decoration-2 underline-offset-[6px]" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/search"
              aria-label="Search"
              className="rounded-full p-2.5 transition-colors hover:bg-card"
            >
              <Search className="h-5 w-5" />
            </Link>
            {/* signed out, this is an offer rather than a locked door — it
                leads to sign-in, and the shop stays usable either way */}
            <Link
              href={signedIn ? "/account" : "/sign-in"}
              aria-label={signedIn ? "Your account" : "Sign in"}
              className="hidden rounded-full p-2.5 transition-colors hover:bg-card sm:block"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/bag"
              aria-label={`Bag, ${ready ? count : 0} item${count === 1 ? "" : "s"}`}
              className="ml-1 flex items-center gap-2 rounded-full bg-plum py-2.5 pl-4 pr-3 text-sm font-medium text-cream transition-colors hover:bg-plum-deep"
            >
              <Bag className="h-4 w-4" />
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-xs font-semibold text-plum-deep">
                {ready ? count : 0}
              </span>
            </Link>
          </div>
        </div>

        <nav className="flex gap-6 overflow-x-auto border-t border-line px-4 py-2.5 md:hidden">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isCurrent(href) ? "page" : undefined}
              className={`shrink-0 text-sm font-medium ${
                isCurrent(href) ? "underline decoration-orange decoration-2 underline-offset-[6px]" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
