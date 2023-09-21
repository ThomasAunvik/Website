import Image from "next/image";
import Link from "next/link";

import { ProfileSocials } from "@/components/Profile/Socials";
import { ProfileEmails } from "@/components/Profile/Emails";
import { LoginButton } from "@/components/Profile/LoginButton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex h-full max-w-screen flex-row items-start">
      <div className="flex flex-col items-center w-80 min-h-full bg-red-600 p-5">
        <h1 className="text-3xl">Thomas Aunvik</h1>
        <h2>Aka. Thaun_</h2>
        <div className="flex flex-col items-center pt-5">
          <Image
            width={250}
            height={250}
            src="/profile/me.webp"
            alt="Profile Picture of Thaun_"
            className="w-1/2 rounded-full"
          />
        </div>
        <div className="flex flex-col items-center pt-5">
          <h1>Direct Contact</h1>
          <ProfileEmails />
          <h1 className="mt-4">Social Links</h1>
          <ProfileSocials />
        </div>
        <Suspense>
          <LoginButton />
        </Suspense>
      </div>
      <div className="flex flex-col items-center flex-1">
        <div>
          <a href="/login">Login Please...</a>
        </div>
        <div>
          <a href="/register">Or Register</a>
        </div>
        <div>
          <a href="/signout">If you are logged in...</a>
        </div>
      </div>
    </main>
  );
}
