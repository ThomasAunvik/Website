import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";

interface MDImageProps {
  src: string;
  alt: string;
}

const ResponsiveImage = (props: MDImageProps) => {
  const config = props.alt.split(";");
  const alt = config[0];

  function getProperty<T>(...property: string[]) {
    const prop = config.find((c) =>
      property.find((p) => c.startsWith(p + ":"))
    );

    if (!prop) return undefined;

    const value = prop.split(":")[1];
    const numValue = parseInt(value);
    if (!Number.isNaN(numValue)) return numValue;

    return value;
  }

  const width = getProperty("w", "width") as number;
  const height = getProperty("h", "height") as number;

  return <Image alt={alt} height={height} width={width} src={props.src} />;
};

export const PostPreview = () => {
  return (
    <article className="prose dark:prose-invert lg:prose-xl text-white">
      <MDXRemote
        options={{
          mdxOptions: { development: process.env.NODE_ENV === "development" },
        }}
        components={{
          img: ResponsiveImage as (props: any) => JSX.Element,
        }}
        source={`# Hello World
  
		This is from Server Components!

		![imgtest;width:200;height:200](/next.svg)
		`}
      />
    </article>
  );
};
