import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const ProfileEmails = () => {
  return (
    <ul className="flex flex-col space-y-2 w-full">
      <li className="flex flex-row items-center justify-center md:justify-start">
        <Link href="mailto:contact@thaun.dev">
          <FontAwesomeIcon icon={faEnvelope} className="w-6" />
        </Link>
        <Link
          href="mailto:contact@thaun.dev"
          className="w-60 pl-2 hidden md:block"
        >
          contact@thaun.dev
        </Link>
      </li>
      <li className="flex flex-row items-center justify-center md:justify-start">
        <Link href="mailto:contact@thaun.dev">
          <FontAwesomeIcon icon={faEnvelope} className="w-6" />
        </Link>
        <Link
          href="mailto:contact@thaun.no"
          className="w-60 pl-2 hidden md:block"
        >
          contact@thaun.no
        </Link>
      </li>
      <li className="flex flex-row items-center justify-center md:justify-start">
        <Link href="gpgcard.txt" target="_blank">
          <FontAwesomeIcon icon={faLock} className="w-6" />
        </Link>
        <Link
          href="/gpgcard.txt"
          target="_blank"
          className="w-60 pl-2 hidden md:block"
        >
          PGP Public Key
        </Link>
      </li>
    </ul>
  );
};
