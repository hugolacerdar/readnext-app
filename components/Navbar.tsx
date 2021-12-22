import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { auth } from "../lib/firebase";
import { UserContext } from "../lib/userContext";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">R.NXT</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img
                  src={user?.photoURL as string}
                  alt={`${username} profile picture`}
                />
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
