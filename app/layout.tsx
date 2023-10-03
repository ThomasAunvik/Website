import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

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

interface RootLayoutProps {
  children: React.ReactNode;
  authmodal: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children, authmodal } = props;

  return (
    <html lang="en">
      <body
        className={inter.className + " h-screen flex flex-col pretty-scrollbar"}
      >
        {authmodal}
        <Toaster />
        <div className="flex flex-1 flex-col">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
