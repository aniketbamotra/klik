import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/* The plum end-card: a documented grid terminal, not homepage furniture.
   Rule from review — fill when two or more cells would be left empty; a
   single trailing gap is an ordinary ragged end and needs nothing. */
/* Fill the last 4-up row only when two or more cells would sit empty; a
   single trailing gap is an ordinary ragged end. Shared so every grid in the
   shop answers the widow the same way. */
export const needsTerminal = (count: number) => ((4 - (count % 4)) % 4) >= 2;

export function EndCard({
  title,
  line,
  href,
  action,
}: {
  title: string;
  /** required now that the catalogue is live: there is no module-level
   *  material list left to fall back on, and a summary of the shop has to be
   *  derived from the pieces the caller actually rendered */
  line: string;
  href: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="group/card col-span-2 block focus-visible:outline-offset-4"
    >
      <div className="card flex h-full flex-col items-start justify-center gap-4 bg-plum p-8 text-cream">
        <span className="display-3">{title}</span>
        <span className="text-sm text-cream/75">{line}</span>
        <span className="btn bg-orange px-6 py-3.5 text-sm text-plum-deep">
          {action}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
