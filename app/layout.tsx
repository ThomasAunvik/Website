import "@/styles/globals.scss";
import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { AxiomWebVitals } from "next-axiom";
import { ThemeProvider } from "@/components/theme-provider";

import { Inter as FontSans } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { cn } from "@/lib/utils";
config.autoAddCss = false;

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
};

export const viewport: Viewport = {
  themeColor: "#FFF",
};

interface RootLayoutProps {
  children: React.ReactNode;
  authmodal: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children, authmodal } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5531336879643074">
      </head>
      <body
        className={cn(
          "bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AxiomWebVitals />
          <div>{authmodal}</div>
          <Toaster />
          <div>{children}</div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
