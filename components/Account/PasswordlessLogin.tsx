"use client";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from "@passwordlessdev/passwordless-client";
import { signIn } from "next-auth/react";
import LoadingDots from "../Loading/LoadingDots";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface PasswordlessLoginProps {
  isModal?: boolean;
}

export const PasswordlessLogin = (props: PasswordlessLoginProps) => {
  const { isModal } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        const p = new Client({
          apiKey: process.env.NEXT_PUBLIC_PASSWORDLESS_KEY ?? "",
        });

        const token = await p.signinWithDiscoverable();

        signIn("passkey", {
          redirect: false,
          passkey: token.token,
          callbackUrl: "/",
          // @ts-ignore
        }).then(({ error }) => {
          console.log(error);
          if (error) {
            setLoading(false);
            toast.error(error);
          } else {
            router.refresh();
            if (isModal) {
              router.back();
            } else {
              router.push("/");
            }
          }
        });
      }}
      className={`${
        loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
      } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
    >
      {loading ? (
        <LoadingDots color="#808080" />
      ) : (
        <span className="flex flex-row align-middle">
          <span className="mr-2">Sign In with Passkey</span>
          <FontAwesomeIcon icon={faKey} className="w-6 h-6" />
        </span>
      )}
    </button>
  );
};
