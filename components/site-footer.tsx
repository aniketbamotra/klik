import Image from "next/image";
import Link from "next/link";

/* Only links with a page behind them. Help (delivery, returns, contact) and the
   About / Journal / Stockists column come back when those pages are written. */
const COLUMNS = [
  ["Shop", [
    ["Jewellery", "/shop/jewellery"],
    ["For the house", "/shop/house"],
    ["Everything", "/shop"],
  ]],
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-plum-deep text-cream/70">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            {/* the knocked-out mark, for the dark ground */}
            <Image
              src="/klik-mark.png"
              alt="Klik"
              width={439}
              height={270}
              loading="eager"
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed">
              A small shop of everyday jewellery and objects for the house.
            </p>
          </div>

          {COLUMNS.map(([heading, items]) => (
            <div key={heading}>
              <p className="label text-cream">{heading}</p>
              <ul className="mt-4 space-y-2.5">
                {items.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition-colors hover:text-orange"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          {/* The proof stamp that used to sit here was removed by the owner's
              decision. Nothing on the storefront now discloses that the
              catalogue is stand-in content — PLACEHOLDERS.md is the record.
              The service rows on the home and product pages still say delivery
              and returns have no terms, which is an absent fact rather than a
              placeholder, and stays. */}
          <span>© {new Date().getFullYear()} Klik</span>
        </div>
      </div>
    </footer>
  );
}
