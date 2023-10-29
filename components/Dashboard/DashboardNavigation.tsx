import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { NavigationMenu } from "../ui/navigation-menu";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { MenuSidebarToggle } from "./SidebarToggle";

export interface DashboardNavigationProps {
  children: ReactNode;
}

export const DashboardNavigation = (props: DashboardNavigationProps) => {
  const { children } = props;

  return (
    <div className="">
      <Sidebar />
      <div id="sidebar-content" className="fixed left-60 top-0 w-full">
        <Menubar className="border-t-0 border-r-0 border-l-0 rounded-none">
          <MenubarMenu>
            <MenuSidebarToggle />
          </MenubarMenu>
        </Menubar>
        {children}
      </div>
    </div>
  );
};
