import { ReactNode } from "react";

import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";

export interface DrawerItem {
  name: string;
  href: string;
  hrefExact?: boolean;
  icon: () => ReactNode;
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
        name: "Dashboard",
        href: "/dashboard",
        hrefExact: true,
        icon: () => <HomeIcon />,
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
