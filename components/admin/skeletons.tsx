/* Skeletons of the thing, not a spinner over content — mounted by each
   route's loading.tsx so the primitive has somewhere to render. */

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="adm-card overflow-hidden" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-adm-line px-5 py-4 last:border-0">
          <div className="adm-skeleton h-11 w-11 shrink-0" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="adm-skeleton h-3.5 w-1/3" />
            <div className="adm-skeleton h-3 w-1/5" />
          </div>
          <div className="adm-skeleton hidden h-6 w-24 sm:block" />
          <div className="adm-skeleton h-3.5 w-16" />
        </div>
      ))}
    </div>
  );
}

export function TilesSkeleton({ n = 4 }: { n?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="adm-card space-y-3 p-5">
          <div className="adm-skeleton h-3 w-20" />
          <div className="adm-skeleton h-7 w-16" />
          <div className="adm-skeleton h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

export function LoadingShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-6">
        <h1 className="adm-h1">{title}</h1>
        <p className="adm-body mt-1.5 text-plum/70" role="status">
          Loading…
        </p>
      </div>
      {children}
    </>
  );
}
