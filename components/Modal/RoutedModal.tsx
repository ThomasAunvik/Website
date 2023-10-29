"use client";

import { useRouter } from "next/navigation";
import { Dialog } from "../ui/dialog";

export interface RoutedModalProps {
  children?: React.ReactNode;
}

export const RoutedModal = (props: RoutedModalProps) => {
  const { children } = props;

  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(value) => {
        if (!value) {
          router.back();
        }
      }}
    >
      {children}
    </Dialog>
  );
};
