import Link from "next/link";
import { Back } from "@/components/admin/icons";

export function PageHead({
  title,
  meta,
  back,
  actions,
}: {
  title: string;
  meta?: string;
  back?: { href: string; label: string };
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {back && (
        <Link
          href={back.href}
          className="adm-body mb-3 inline-flex items-center gap-1.5 text-plum/70 transition-colors hover:text-plum"
        >
          <Back className="h-4 w-4" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="adm-h1">{title}</h1>
          {meta && <p className="adm-body mt-1.5 text-plum/70">{meta}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}
