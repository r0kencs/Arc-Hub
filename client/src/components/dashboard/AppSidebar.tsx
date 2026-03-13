import { Location, MapsIcon, Target02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon: any;
};

const items: NavItem[] = [
  {
    title: "Maps",
    url: "/maps",
    icon: MapsIcon,
  },
  {
    title: "Spawns",
    url: "/spawns",
    icon: Location,
  },
  {
    title: "Lineups",
    url: "/lineups",
    icon: Target02Icon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <img src="/logo.svg" className="h-8" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <HugeiconsIcon icon={item.icon} size={20} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
