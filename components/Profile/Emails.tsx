import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const ProfileEmails = () => {
  return (
    <ul className="flex flex-col space-y-2">
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faEnvelope} className="w-6" />
        <Link href="mailto:contact@thaun.dev" className="w-60 pl-2">
          contact@thaun.dev
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faEnvelope} className="w-6" />
        <Link href="mailto:contact@thaun.no" className="w-60 pl-2">
          contact@thaun.no
        </Link>
      </li>
      <li className="flex flex-row items-center">
        <FontAwesomeIcon icon={faLock} className="w-6" />
        <Link href="/gpgcard.txt" target="_blank" className="w-60 pl-2">
          PGP Public Key
        </Link>
      </li>
    </ul>
  );
};
