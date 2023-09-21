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

export const ProfileSocials = () => {
  return (
    <ul className="flex flex-col space-y-2">
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faGithub} className="w-6" />
        <Link href="https://github.com/ThomasAunvik" className="w-60 pl-2">
          ThomasAunvik
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faLinkedin} className="w-6" />
        <Link href="https://www.linkedin.com/in/thaun" className="w-40 pl-2">
          in/thaun
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faReddit} className="w-6" />
        <Link href="https://www.reddit.com/user/Thaun_" className="w-60 pl-2">
          u/Thaun_
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faXTwitter} className="w-6" />
        <Link href="https://twitter.com/Thaun_" className="w-60 pl-2">
          @ThomasAunvik
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faYoutube} className="w-6" />
        <Link
          href="https://www.youtube.com/channel/UCZdB8pMvNNTgTwt9aln_wbA"
          className="w-40 pl-2"
        >
          Thaun_
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faMastodon} className="w-6" />
        <Link href="https://social.linux.pizza/@thaun" className="w-40 pl-2">
          @thaun@social.linux.pizza
        </Link>
      </li>
    </ul>
  );
};
