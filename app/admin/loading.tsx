import {
  LoadingShell,
  TableSkeleton,
  TilesSkeleton,
} from "@/components/admin/skeletons";

export default function Loading() {
  return (
    <LoadingShell title="Overview">
      <TilesSkeleton />
      <div className="mt-6">
        <TableSkeleton rows={5} />
      </div>
    </LoadingShell>
  );
}
