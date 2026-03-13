import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/spawns")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/spawns"!</div>;
}
