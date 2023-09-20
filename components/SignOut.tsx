"use client";
import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <button
      className="text-stone-400 hover:text-stone-200 transition-all"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
};
