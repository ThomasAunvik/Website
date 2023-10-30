"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  SidebarIcon,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
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

    const match = window.matchMedia("(min-width: 768px)");
    setOpen(match.matches);

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

        const match = window.matchMedia("(min-width: 768px)");
        const isOpen =
          sidebar.className.includes("sidebar-open") || (open && !match);

        if (isOpen) {
          sidebar.className =
            "fixed -left-60 w-60 top-0 z-40 h-screen transition-all duration-500 group sidebar-closed";

          content.className =
            "fixed left-0 md:left-0 top-0 w-full transition-all duration-500";
          setOpen(false);
        } else {
          sidebar.className =
            "fixed left-0 w-60 top-0 z-40 h-screen transition-all duration-500 group sidebar-open";
          content.className =
            "fixed left-0 md:left-60 top-0 w-full transition-all duration-500";
          setOpen(true);
        }
      }}
    >
      <span className="hidden md:block">
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </span>
      <span className="block md:hidden">
        <MenuIcon />
      </span>
    </MenubarTrigger>
  );
};

export const SidebarClose = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const asideFound = document.getElementsByTagName("aside");
    const aside = asideFound[0];

    const contentFound = document.getElementById("sidebar-content");

    sidebarRef.current = aside;
    contentRef.current = contentFound;
  }, []);

  return (
    <XIcon
      onClick={() => {
        const sidebar = sidebarRef.current;
        const content = contentRef.current;
        if (!sidebar) return;
        if (!content) return;

        sidebar.className =
          "fixed -left-60 w-60 top-0 z-40 h-screen transition-all duration-500 group sidebar-closed";

        content.className =
          "fixed left-0 md:left-0 top-0 w-full transition-all duration-500";
      }}
    />
  );
};

export const DivClose = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const asideFound = document.getElementsByTagName("aside");
    const aside = asideFound[0];

    const contentFound = document.getElementById("sidebar-content");

    sidebarRef.current = aside;
    contentRef.current = contentFound;
  }, []);

  const close = () => {
    const sidebar = sidebarRef.current;
    const content = contentRef.current;
    if (!sidebar) return;
    if (!content) return;

    sidebar.className =
      "fixed -left-60 w-60 top-0 z-40 h-screen transition-all duration-500 group sidebar-closed";

    content.className =
      "fixed left-0 md:left-0 top-0 w-full transition-all duration-500";
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="hidden group-[.sidebar-open]:block md:group-[.sidebar-open]:hidden fixed top-0 bottom-0 left-0 right-0 bg-black opacity-40 -z-10"
      onKeyDown={(e) => {
        if (e.key == "Esc") {
          close();
        }
      }}
      onClick={close}
    />
  );
};
