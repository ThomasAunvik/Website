import { authOptions } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const LoginButton = async () => {
  const session = await getServerSession(authOptions);
  if (session) return;

  return (
    <div className="mt-auto mb-0">
      <Link href="/login">Login</Link>
    </div>
  );
};
