"use client";
import { usePathname } from "next/navigation";
import { DrawerItem } from "./DrawerItems";
import Link from "next/link";
import { ReactNode } from "react";

export interface SidebarItemProps {
  href: string;
  hrefExact?: boolean;
  children?: ReactNode;
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { href, hrefExact, children } = props;

  const currentPath = usePathname();
  const selected =
    (!hrefExact && currentPath?.startsWith(href)) || href == currentPath;

  return (
    <li>
      <Link
        href={href}
        className={`${
          selected
            ? "bg-slate-200 text-slate-900 dark:text-dark"
            : "text-slate-900 dark:text-white"
        } flex items-center rounded-lg px-3 py-2 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700`}
      >
        {children}
      </Link>
    </li>
  );
};
