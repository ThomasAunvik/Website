import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { LoginForm } from "@/components/Auth/LoginForm";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Login() {
  return (
    <RoutedModal>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </DialogHeader>
        <LoginForm isModal />
      </DialogContent>
    </RoutedModal>
  );
}
