import Head from "next/head";
import Metatags from "../../components/Metatags";

export default function AdminPostsPage({}) {
  return (
    <main>
      <Metatags
        title="Admin Page"
        description="The READNEXT admin page."
        image=""
      />
      <h1>Admin Posts</h1>
    </main>
  );
}
