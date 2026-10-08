import {
  LoadingShell,
  TableSkeleton,
  TilesSkeleton,
} from "@/components/admin/skeletons";

export default function Loading() {
  return (
    <LoadingShell title="Inventory">
      <TilesSkeleton n={3} />
      <div className="mt-6">
        <TableSkeleton />
      </div>
    </LoadingShell>
  );
}
