"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export interface SignOutProps {
  isModal?: boolean;
}

export const SignOut = (props: SignOutProps) => {
  const { isModal } = props;

  const router = useRouter();

  return (
    <div className="flex flex-row px-4 py-8 sm:px-16">
      <Button
        onClick={() => {
          if (isModal) router.back();
          else router.push("/");
        }}
        className={`flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mr-2`}
      >
        No
      </Button>
      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none ml-2`}
      >
        Yes
      </Button>
    </div>
  );
};
