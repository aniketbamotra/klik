import Link from "next/link";

/* An empty state should teach the screen, not announce absence. */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="adm-card flex flex-col items-start gap-3 p-8 sm:p-10">
      <p className="adm-h2">{title}</p>
      <p className="adm-body max-w-[52ch] text-plum/70">{body}</p>
      {action && (
        <Link href={action.href} className="adm-btn adm-btn-primary mt-2">
          {action.label}
        </Link>
      )}
    </div>
  );
}
