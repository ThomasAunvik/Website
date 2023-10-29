import { SignOut } from "@/components/SignOut";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border shadow-xl p-8 space-y-2">
        <div>
          <p className="text-sm text-gray-500">Do you want to sign out?</p>
        </div>
        <SignOut />
      </div>
    </div>
  );
}
