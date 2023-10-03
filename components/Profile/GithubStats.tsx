import Image from "next/image";

export const GithubStatsLanguages = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      fetchPriority="high"
      alt="Chart of Programming Languages in ThomasAunvik's GitHub"
      src="/_next/image?url=https%3A%2F%2Fgh-stats.thaun.dev%2Fgenerated%2Flanguages.svg&w=640&q=75#gh-dark-mode-only"
    />
  );
};

export const GithubStatsOverview = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      fetchPriority="high"
      alt="Statistics in ThomasAunvik's GitHub"
      src="/_next/image?url=https%3A%2F%2Fgh-stats.thaun.dev%2Fgenerated%2Foverview.svg&w=640&q=75#gh-dark-mode-only"
    />
  );
};
