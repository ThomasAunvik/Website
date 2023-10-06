import { PasswordlessRegister } from "@/components/Account/PasswordlessRegister";
import { registerPassless } from "@/lib/passwordless";

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
