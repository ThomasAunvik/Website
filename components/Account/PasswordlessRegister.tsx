"use client";
import { Client as PWClient } from "@passwordlessdev/passwordless-client";
import { useRef } from "react";

export interface PasswordlessProps {
  registerToken: string;
}

export const PasswordlessRegister = (props: PasswordlessProps) => {
  const { registerToken } = props;

  const passname = useRef("");

  return (
    <div>
      <input
        className="text-black"
        type="text"
        placeholder="Passwordless Name"
        onChange={(e) => (passname.current = e.currentTarget.value)}
      />
      <button
        onClick={async () => {
          const p = new PWClient({
            apiKey: process.env.NEXT_PUBLIC_PASSWORDLESS_KEY ?? "",
          });

          const { token, error } = await p.register(
            registerToken,
            passname.current,
          );

          if (token) {
            console.log("Registered...");
          } else {
            console.error(error);
          }
        }}
      >
        Register passless key
      </button>
    </div>
  );
};
