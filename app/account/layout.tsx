import ThemeRegistry from "@/components/Dashboard/ThemeRegistry";
import { Metadata } from "next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const title = "Thaun.Dev Account";
const description = "Thaun's Account";

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

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout(props: AccountLayoutProps) {
  const { children } = props;

  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <section>{children}</section>
    </ThemeRegistry>
  );
}
