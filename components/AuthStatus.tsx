import { authOptions } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import Link from "next/link";

export const AuthStatus = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return (
    <div className="w-full flex items-center bg-gray-600 h-8">
      <p className="text-stone-200 text-sm pl-4">
        <span className="hidden md:inline-block">Signed in as&nbsp;</span>
        {session.user?.email}
      </p>
      <div className="mr-0 ml-auto pr-4 md:pr-8">
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div className="mr-0 pr-2 md:pr-8">
        <Link href="/signout">Sign out</Link>
      </div>
    </div>
  );
};
