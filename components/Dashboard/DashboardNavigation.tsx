import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Menubar, MenubarMenu } from "../ui/menubar";
import { MenuSidebarToggle } from "./SidebarToggle";

export interface DashboardNavigationProps {
  children: ReactNode;
}

export const DashboardNavigation = (props: DashboardNavigationProps) => {
  const { children } = props;

  return (
    <div className="">
      <Sidebar />
      <div
        id="sidebar-content"
        className="fixed left-0 md:left-60 top-0 w-full transition-all duration-500"
      >
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
