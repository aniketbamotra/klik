import Image from "next/image";
import Link from "next/link";

/* The shop's 404: unmatched addresses (via [...rest]) and any notFound() thrown
   by a shop page — a piece, counter or order that does not exist. */

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20 sm:px-6">
      <div className="w-full max-w-xl text-center">
        <Image
          src="/klik-lockup.png"
          alt="Klik"
          width={435}
          height={266}
          className="mx-auto h-10 w-auto"
        />
        <h1 className="display-1 mt-8">
          Nothing at this address.
        </h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-plum/75">
          The page may have moved, or the address is off by a letter. Everything
          in the shop is a click away.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-primary px-7 py-4 text-sm">
            Browse the shop
          </Link>
          <Link href="/" className="btn btn-quiet px-6 py-4 text-sm">
            Back to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
