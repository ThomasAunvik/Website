import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
        icon: () => <DashboardIcon />,
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
        icon: () => <LogoutIcon />,
      },
    ],
  },
];

export default drawerCategories;
