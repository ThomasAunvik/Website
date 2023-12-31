import { Metadata, Viewport } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { DashboardNavigation } from "@/components/Dashboard/DashboardNavigation";

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
};

export const viewport: Viewport = {
  themeColor: "#FFF",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;

  return (
    <div>
      <DashboardNavigation>
        <section className="p-4">{children}</section>
      </DashboardNavigation>
    </div>
  );
};

export default DashboardLayout;
