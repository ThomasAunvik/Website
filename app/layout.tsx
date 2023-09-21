import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthStatus } from "@/components/AuthStatus";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

const title = "Thaun.Dev";
const description = "Thaun's Portfolio Site";

export const metadata: Metadata = {
  title: title,
  description: description,
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
  metadataBase: new URL("https://thaun.dev"),
  themeColor: "#FFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen flex flex-col"}>
        <Toaster />
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
