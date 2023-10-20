import { auth } from "@/lib/auth";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

export const AuthStatus = async () => {
  const session = await auth();

  if (!session) return;

  return (
    <Menubar className="border-t-0 border-r-0 border-l-0 rounded-none">
      <div className="flex-1">
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
          <MenubarContent>
            <Link href="/dashboard">
              <MenubarItem>Open Dashboard</MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href="/dashboard/posts">
              <MenubarItem>Posts</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </div>
      <MenubarMenu>
        <MenubarTrigger>
          <span>Signed in as&nbsp;{session?.user?.email}</span>
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/account">
            <MenubarItem>Account</MenubarItem>
          </Link>
          <Link href="/signout">
            <MenubarItem>Signout</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
