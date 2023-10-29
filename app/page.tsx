import { AuthStatus } from "@/components/AuthStatus";

import Image from "next/image";

import { Suspense } from "react";

import { ProfileSocials } from "@/components/Profile/Socials";
import { ProfileEmails } from "@/components/Profile/Emails";
import {
  GithubStatsLanguages,
  GithubStatsOverview,
} from "@/components/Profile/GithubStats";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LoginButton } from "@/components/Profile/LoginButton";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export default function Home() {
  return (
    <main className="flex-row items-start whitespace-nowrap">
      <div className="w-14 md:w-80 flex flex-col items-center top-0 fixed border-0 pretty-scrollbar overflow-y-auto overflow-x-clip bottom-0 bg-gray-800">
        <div className="top-0 bottom-0 bg-gray-800">
          <Card className="border-0 rounded-none h-full md:p-5 bg-gray-800">
            <CardHeader>
              <CardTitle>
                <span className="text-3xl hidden md:block">Thomas Aunvik</span>
                <span className="hidden md:block">Aka. Thaun_</span>
                <div className="flex flex-col items-center pt-5 w-20 md:w-64">
                  <Image
                    width={250}
                    height={250}
                    priority={true}
                    fetchPriority="high"
                    src="/profile/me.webp"
                    alt="Profile Picture of Thaun_"
                    className="w-1/2 rounded-full"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="hidden md:block">Direct Contact</h1>
              <ProfileEmails />
              <h1 className="hidden md:block mt-4">Social Links</h1>
              <div className="pt-12 md:pt-0 w-full">
                <ProfileSocials />
              </div>
            </CardContent>
            <CardFooter>
              <LoginButton />
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="pretty-scrollbar ml-14 md:ml-80">
        <Suspense>
          <AuthStatus />
        </Suspense>
        <div className="flex flex-col items-center">
          <div className="block md:hidden">
            <h1 className="text-3xl">Thomas Aunvik</h1>
            <h2>Aka. Thaun_</h2>
          </div>
          <div className="flex flex-row items-center flex-wrap justify-evenly">
            <GithubStatsOverview />
            <GithubStatsLanguages />
          </div>
        </div>
      </div>
    </main>
  );
}
