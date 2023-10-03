import Image from "next/image";
import Link from "next/link";
import { AuthStatus } from "@/components/AuthStatus";

import { ProfileSocials } from "@/components/Profile/Socials";
import { ProfileEmails } from "@/components/Profile/Emails";
import { LoginButton } from "@/components/Profile/LoginButton";
import { Suspense } from "react";
import {
  GithubStatsLanguages,
  GithubStatsOverview,
} from "@/components/Profile/GithubStats";

export default function Home() {
  return (
    <main className="flex flex-1 h-max max-w-screen flex-row items-start flex-wrap">
      <div className="h-full w-14 md:w-80 bg-red-600">
        <div className="flex flex-col items-center top-0 sticky pretty-scrollbar overflow-y-auto overflow-x-clip max-h-screen md:p-5">
          <h1 className="text-3xl hidden md:block">Thomas Aunvik</h1>
          <h2 className="hidden md:block">Aka. Thaun_</h2>
          <div className="flex flex-col items-center pt-5">
            <Image
              width={250}
              height={250}
              priority={true}
              fetchPriority="high"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              src="/profile/me.webp"
              alt="Profile Picture of Thaun_"
              className="w-1/2 rounded-full"
            />
          </div>
          <div className="flex flex-col items-center pt-5">
            <h1 className="hidden md:block">Direct Contact</h1>
            <ProfileEmails />
            <h1 className="hidden md:block mt-4">Social Links</h1>
            <div className="pt-12 md:pt-0 w-full">
              <ProfileSocials />
            </div>
          </div>
          <Suspense>
            <LoginButton />
          </Suspense>
        </div>
      </div>
      <div className="flex-1 pretty-scrollbar">
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
        <div className="flex flex-col items-center flex-1 pt-5">
          <div className="block md:hidden">
            <h1 className="text-3xl">Thomas Aunvik</h1>
            <h2>Aka. Thaun_</h2>
          </div>
          <div className="flex flex-row items-center flex-wrap justify-evenly">
            <GithubStatsOverview />
            <GithubStatsLanguages />
          </div>
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
      </div>
    </main>
  );
}
