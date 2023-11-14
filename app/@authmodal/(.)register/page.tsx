import { RegisterForm } from "@/components/Auth/RegisterForm";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Login() {
  return (
    <RoutedModal>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </DialogHeader>
        <RegisterForm isModal={true} />
      </DialogContent>
    </RoutedModal>
  );
}
