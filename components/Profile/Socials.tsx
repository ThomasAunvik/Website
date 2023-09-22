import Link from "next/link";

import {
  faMastodon,
  faYoutube,
  faXTwitter,
  faReddit,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialAccount {
  name: string;
  link: string;
  icon: JSX.Element;
}

export const ProfileSocials = () => {
  const socials: SocialAccount[] = [
    {
      name: "ThomasAunvik",
      link: "https://github.com/ThomasAunvik",
      icon: <FontAwesomeIcon icon={faGithub} className="w-6" />,
    },
    {
      name: "in/thaun",
      link: "https://www.linkedin.com/in/thaun",
      icon: <FontAwesomeIcon icon={faLinkedin} className="w-6" />,
    },
    {
      name: "u/Thaun_",
      link: "https://www.reddit.com/user/Thaun_",
      icon: <FontAwesomeIcon icon={faReddit} className="w-6" />,
    },
    {
      name: "@ThomasAunvik",
      link: "https://twitter.com/ThomasAunvik",
      icon: <FontAwesomeIcon icon={faXTwitter} className="w-6" />,
    },
    {
      name: "Thaun_",
      link: "https://www.youtube.com/channel/UCZdB8pMvNNTgTwt9aln_wbA",
      icon: <FontAwesomeIcon icon={faYoutube} className="w-6" />,
    },
    {
      name: "@thaun@social.linux.pizza",
      link: "https://social.linux.pizza/@thaun",
      icon: <FontAwesomeIcon icon={faMastodon} className="w-6" />,
    },
  ];

  return (
    <ul className="flex flex-col space-y-2 w-full">
      {socials.map((s) => (
        <li className="flex flex-row items-center justify-center md:justify-start">
          <Link href={s.link} target="_blank">
            {s.icon}
          </Link>
          <Link
            href={s.link}
            target="_blank"
            className="w-40 pl-2 hidden md:block"
          >
            {s.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
