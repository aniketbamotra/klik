import { LoadingShell, TableSkeleton } from "@/components/admin/skeletons";

export default function Loading() {
  return (
    <LoadingShell title="Orders">
      <TableSkeleton />
    </LoadingShell>
  );
}
