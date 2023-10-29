import { LayoutDashboard } from "lucide-react";
import drawerCategories from "./DrawerItems";
import { Separator } from "../ui/separator";
import { SidebarItem } from "./SidebarItem";
import { SidebarToggle } from "./SidebarToggle";

export interface SidebarProps {}

export const Sidebar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed left-0 w-60 top-0 z-40 h-screen transition-all duration-500"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <a
          href="#"
          className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        >
          <LayoutDashboard />
          <span className="ml-3 text-base font-semibold">
            Thaun's Dashboard
          </span>
        </a>
        {drawerCategories.map((c, i) => {
          return (
            <ul key={`c-${c.name}`} className="space-y-2 text-sm font-medium">
              {i != 0 && i != drawerCategories.length && (
                <Separator className="mt-2" />
              )}
              {c.items.map((i) => {
                return (
                  <SidebarItem
                    href={i.href}
                    hrefExact={i.hrefExact}
                    key={`c-${c.name}-i-${i.name}`}
                  >
                    {i.icon()}
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      {i.name}
                    </span>
                  </SidebarItem>
                );
              })}
            </ul>
          );
        })}
      </div>
    </aside>
  );
};
