import { getServerSession } from "next-auth";

export const AuthStatus = async () => {
  const session = await getServerSession();

  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {session && (
        <p className="text-stone-200 text-sm">
          Signed in as {session.user?.email}
        </p>
      )}
    </div>
  );
};
