import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const ProfileEmails = () => {
  return (
    <ul className="flex flex-col space-y-2 w-full">
      <li>
        <Link
          href="mailto:contact@thaun.dev"
          className="flex flex-row items-center justify-center md:justify-start"
          aria-label="Email contact@thaun.dev"
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
          <span className="w-60 pl-2 hidden md:block">contact@thaun.dev</span>
        </Link>
      </li>
      <li>
        <Link
          href="mailto:contact@thaun.no"
          className="flex flex-row items-center justify-center md:justify-start"
          aria-label="Email contact@thaun.no"
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
          <span className="w-60 pl-2 hidden md:block">contact@thaun.no</span>
        </Link>
      </li>

      <li>
        <Link
          href="/gpgcard.txt"
          className="flex flex-row items-center justify-center md:justify-start"
          aria-label="Email PGP Public Key"
          prefetch={false}
        >
          <FontAwesomeIcon icon={faLock} className="w-6 h-6" />
          <span className="w-60 pl-2 hidden md:block">PGP Public Key</span>
        </Link>
      </li>
    </ul>
  );
};
