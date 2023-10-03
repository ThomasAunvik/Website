import MiniDrawer from "@/components/Dashboard/Drawer";
import ThemeRegistry from "@/components/Dashboard/ThemeRegistry";
import { Metadata } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const title = "Thaun.Dev";
const description = "Thaun's";

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

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return <section>{children}</section>;
}
