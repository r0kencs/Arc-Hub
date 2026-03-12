import { Location, MapsIcon, Target02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
    url: "./maps",
    icon: MapsIcon,
  },
  {
    title: "Spawns",
    url: "./spawns",
    icon: Location,
  },
  {
    title: "Lineups",
    url: "./lineups",
    icon: Target02Icon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <img src="/logo.svg" className="h-10" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton className="">
                <HugeiconsIcon icon={item.icon} size={20} />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
