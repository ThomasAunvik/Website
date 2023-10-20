import { auth } from "@/lib/auth";
import Link from "next/link";

export const LoginButton = async () => {
  const session = await auth();
  if (session) return;

  return (
    <div className="mt-auto mb-0">
      <Link href="/login">Login</Link>
    </div>
  );
};
