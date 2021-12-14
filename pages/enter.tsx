import { useContext } from "react";
import { UserContext } from "../lib/userContext";
import { auth, googleAuthProvider } from "../lib/firebase";

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    // TODO - apply error handler
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google-logo.png"} alt="google logo" /> Sign in with Google
    </button>
  );
}
function SignOutButton() {
  return (
    <button className="btn-google" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
}
function UsernameForm() {
  return <></>;
}
