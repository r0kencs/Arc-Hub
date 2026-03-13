import { SpawnDataTable } from "@/entities/spawn/components/SpawnDataTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/spawns")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto p-10 w-full">
      <SpawnDataTable />
    </div>
  );
}
