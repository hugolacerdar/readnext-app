interface UserProfileProps {
  user: {
    photoURL: string;
    displayName: string;
    uid: string;
    username: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="box-center">
      <img src={user.photoURL} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
