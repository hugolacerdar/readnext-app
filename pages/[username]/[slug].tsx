import styles from "../../styles/Post.module.css";

import { useDocumentData } from "react-firebase-hooks/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import PostContent from "../../components/PostContent";

interface Post {
  title: string;
  slug: string;
  uid: string;
  username: string;
  published: boolean;
  content: string;
  createdAt: number | any;
  updatedAt: number;
  heartCount: number;
}

interface User {
  username: string;
  uid: string;
  displayName: string;
  photoURL: string;
}
interface PostPageProps {
  post: Post;
  path: string;
  user: User;
}

export default function PostPage(props: PostPageProps) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = (realtimePost as Post) || (props.post as Post);

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤎</strong>
        </p>
      </aside>
    </main>
  );
}
interface ParamsProps extends ParsedUrlQuery {
  username: string;
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, slug } = params as ParamsProps;

  const userDoc = await getUserWithUsername(username);

  let user;
  let post;
  let path;

  if (userDoc) {
    user = userDoc.data();
    const postQuery = userDoc.ref
      .collection("posts")
      .where("slug", "==", slug)
      .limit(1);

    post = (await postQuery.get()).docs.map(postToJSON)[0];

    const postRef = userDoc.ref.collection("posts").doc(slug);
    path = postRef.path;
  }

  return {
    props: {
      user,
      post,
      path,
    },
    revalidate: 5000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup("posts").get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};
