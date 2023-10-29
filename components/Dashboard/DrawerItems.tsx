import {
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  NewspaperIcon,
} from "lucide-react";
import React from "react";

export interface DrawerItem {
  name: string;
  href: string;
  hrefExact?: boolean;
  icon: () => JSX.Element;
}

export interface DrawerCategory {
  name: string;
  items: DrawerItem[];
}

const drawerCategories: DrawerCategory[] = [
  {
    name: "Tools",
    items: [
      {
        name: "Main Page",
        href: "/",
        hrefExact: true,
        icon: () => <HomeIcon />,
      },
      {
        name: "Dashboard",
        href: "/dashboard",
        hrefExact: true,
        icon: () => <LayoutDashboardIcon />,
      },
      {
        name: "Posts",
        href: "/dashboard/posts",
        icon: () => <NewspaperIcon />,
      },
    ],
  },
  {
    name: "Account",
    items: [
      {
        name: "Log out",
        href: "/signout",
        icon: () => <LogOutIcon />,
      },
    ],
  },
];

export default drawerCategories;
