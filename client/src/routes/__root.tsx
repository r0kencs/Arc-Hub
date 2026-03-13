import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Layout from "../components/dashboard/Layout";
import "../index.css"; // Import your global CSS here

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Layout>
      {/* The Outlet renders whatever the current route is 
         (e.g., Dashboard, Settings, etc.) inside your Layout 
      */}
      <Outlet />

      {/* Devtools are usually placed here, outside the Layout or at the bottom */}
      <TanStackRouterDevtools />
    </Layout>
  );
}
