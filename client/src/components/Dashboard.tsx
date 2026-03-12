import {
  TargetIcon,
  MapsIcon,
  AiLocation01Icon,
  Setting01Icon,
  Mouse01Icon,
} from "@hugeicons/react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const navItems = [
  { title: "Lineups", icon: TargetIcon, color: "text-rose-500", count: 452 },
  { title: "Maps", icon: MapsIcon, color: "text-sky-500", count: 9 },
  {
    title: "Spawns",
    icon: AiLocation01Icon,
    color: "text-emerald-500",
    count: 124,
  },
  {
    title: "Settings",
    icon: Setting01Icon,
    color: "text-slate-500",
    count: null,
  },
];

export default function Dashboard() {
  return (
    <div className="p-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {navItems.map((item) => (
          <Card
            key={item.title}
            className="group hover:shadow-2xl transition-all border-none bg-secondary/30"
          >
            <CardHeader className="flex flex-col items-center py-10">
              {/* THE HUGE ICON */}
              <div className="mb-6 p-6 rounded-3xl bg-background shadow-sm group-hover:scale-110 transition-transform">
                <item.icon
                  size={64} // Huge size
                  variant="stroke"
                  className={item.color}
                />
              </div>
              <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
              {item.count && (
                <p className="text-muted-foreground font-mono">
                  {item.count} Entries
                </p>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
