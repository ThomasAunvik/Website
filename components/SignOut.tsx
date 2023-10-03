"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface SignOutProps {
  isModal?: boolean;
}

export const SignOut = (props: SignOutProps) => {
  const { isModal } = props;

  const router = useRouter();

  return (
    <div className="flex flex-row bg-gray-50 px-4 py-8 sm:px-16 text-black">
      <button
        onClick={() => {
          if (isModal) router.back();
          else router.push("/");
        }}
        className={`border-black bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mr-2`}
      >
        No
      </button>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`border-black bg-black text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none ml-2`}
      >
        Yes
      </button>
    </div>
  );
};
