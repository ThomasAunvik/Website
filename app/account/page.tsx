import { PasswordlessRegister } from "@/components/Account/PasswordlessRegister";
import { registerPassless } from "@/lib/passwordless";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1
export const dynamic = "force-dynamic";

const AccountPage = async () => {
  const passless = await registerPassless();

  return (
    <div>
      {!passless ? (
        <span>Failed to generate passkey</span>
      ) : (
        <PasswordlessRegister registerToken={passless} />
      )}
    </div>
  );
};

export default AccountPage;
