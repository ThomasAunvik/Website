"use client";

import { ChevronLeftIcon, ChevronRightIcon, SidebarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { MenubarTrigger } from "../ui/menubar";

export const SidebarToggle = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const asideFound = document.getElementsByTagName("aside");
    const aside = asideFound[0];
    sidebarRef.current = aside;
  }, []);

  return (
    <Button
      onClick={() => {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;
        sidebar.className =
          "fixed -left-60 w-60 top-0 z-40 h-screen transition-all duration-500";
      }}
    >
      <SidebarIcon /> Close
    </Button>
  );
};

export const MenuSidebarToggle = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const asideFound = document.getElementsByTagName("aside");
    const aside = asideFound[0];

    const contentFound = document.getElementById("sidebar-content");

    setOpen(!aside.className.includes("-left-60"));

    sidebarRef.current = aside;
    contentRef.current = contentFound;
  }, []);

  return (
    <MenubarTrigger
      onClick={() => {
        const sidebar = sidebarRef.current;
        const content = contentRef.current;
        if (!sidebar) return;
        if (!content) return;

        if (open) {
          sidebar.className =
            "fixed -left-60 w-60 top-0 z-40 h-screen transition-all duration-500";

          content.className =
            "fixed left-0 top-0 w-full transition-all duration-500";
          setOpen(false);
        } else {
          sidebar.className =
            "fixed left-0 w-60 top-0 z-40 h-screen transition-all duration-500";
          content.className =
            "fixed left-60 top-0 w-full transition-all duration-500";
          setOpen(true);
        }
      }}
    >
      {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </MenubarTrigger>
  );
};
