import Modal from "@/components/Modal/Modal";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { SignOut } from "@/components/SignOut";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Home() {
  return (
    <RoutedModal>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">Do you want to sign out?</p>
        </DialogHeader>
        <SignOut isModal={true} />
      </DialogContent>
    </RoutedModal>
  );
}
