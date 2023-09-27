import MiniDrawer from "@/components/Dashboard/Drawer";
import ThemeRegistry from "@/components/Dashboard/ThemeRegistry";
import { Metadata } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const title = "Thaun.Dev Dashboard";
const description = "Thaun's Dashboard";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <MiniDrawer>
        <section>{children}</section>
      </MiniDrawer>
    </ThemeRegistry>
  );
}
