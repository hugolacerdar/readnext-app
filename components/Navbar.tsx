import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/userContext";

interface UserInterface {
  photoURL?: string;
}

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">FEED</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL} alt={`${username} profile picture`} />
              </Link>
            </li>
          </>
        )}
        {!username && (
          <Link href="/enter" passHref>
            <button className="btn-blue">Log in</button>
          </Link>
        )}
      </ul>
    </nav>
  );
}
