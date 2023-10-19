import { Metadata } from "next";

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
