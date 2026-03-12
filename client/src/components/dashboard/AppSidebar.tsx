import { MapsIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

// 1. Update your type to accept the specific icon object type
type NavItem = {
  title: string;
  url: string;
  icon: any; // Or 'IconSvgObject' if you want to be specific
};

const items: NavItem[] = [
  {
    title: "Maps",
    url: "./maps",
    icon: MapsIcon, // This is the object causing the error
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <a href={item.url} className="flex gap-2 items-center">
                  <HugeiconsIcon icon={item.icon} size={20} />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
