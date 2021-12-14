import { auth, googleAuthProvider } from "../lib/firebase";

export default function EnterPage({}) {
  const user = null;
  const username = null;

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
  return <></>;
}
function UsernameForm() {
  return <></>;
}
