import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/userContext";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import Metatags from "../../components/Metatags";

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

export default function AdminPostsPage({}) {
  return (
    <main>
      <Metatags
        title="Admin Page"
        description="The READNEXT admin page."
        image="./public/readme/rtx.png"
      />
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser?.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc: { data: () => Post }) =>
    doc.data()
  );

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  async function createPost(e: FormEvent) {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success("Post created!");

    router.push(`/admin/${slug}`);
  }

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What people will be reading next"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
