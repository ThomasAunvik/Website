import Modal from "@/components/Modal/Modal";
import { SignOut } from "@/components/SignOut";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Home() {
  return (
    <Modal>
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <p className="text-sm text-gray-500">Do you want to sign out?</p>
        </div>
        <SignOut isModal={true} />
      </div>
    </Modal>
  );
}
