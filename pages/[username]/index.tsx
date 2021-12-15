import { GetServerSideProps } from "next";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";

interface Post {
  title: string;
  slug: string;
  uid: string;
  username: string;
  published: boolean;
  content: string;
  createdAt: number;
  updatedAt: number;
  heartCount: number;
}
interface User {
  username: string;
  uid: string;
  displayName: string;
  photoURL: string;
}
interface UserProfilePageProps {
  user: User;
  posts: Post[];
}

export default function UserProfilePage({ user, posts }: UserProfilePageProps) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const userDoc = await getUserWithUsername(username as string);

  let user = null;
  let posts = null;

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);

    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
};
