import { AuthForm } from "@/components/Auth/AuthForm";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border shadow-xl p-8 space-y-2">
        <div>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <AuthForm authType="register" />
      </div>
    </div>
  );
}
