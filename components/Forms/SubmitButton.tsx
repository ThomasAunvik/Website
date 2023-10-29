"use client";
import { useFormStatus } from "react-dom";
import LoadingDots from "../Loading/LoadingDots";
import { Button } from "../ui/button";
import { ReactNode } from "react";

export interface SubmitButtonProps {
  loading?: boolean;
  children?: ReactNode;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { loading, children } = props;

  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || loading}
      className={`${
        pending || loading
          ? "cursor-not-allowed border-gray-800 bg-gray-900"
          : ""
      } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
    >
      {pending || loading ? <LoadingDots color="#808080" /> : <p>{children}</p>}
    </Button>
  );
};
