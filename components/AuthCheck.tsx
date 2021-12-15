import Link from "next/link";
import { ReactNode, useContext } from "react";
import { UserContext } from "../lib/userContext";

interface AuthCheckProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { username } = useContext(UserContext);
  return (
    <>
      {username
        ? children
        : fallback || <Link href="/enter">You must be signed in</Link>}
    </>
  );
}
