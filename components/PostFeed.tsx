import Link from "next/link";

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

interface PostFeedProps {
  posts: Post[];
  admin?: boolean;
}

export default function PostFeed({ posts, admin = false }: PostFeedProps) {
  return (
    <>
      {posts
        ? posts.map((post) => (
            <PostItem key={post.slug} post={post} admin={admin} />
          ))
        : null}
    </>
  );
}

interface PostItemProps {
  post: Post;
  admin?: boolean;
}
function PostItem({ post, admin = false }: PostItemProps) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`} passHref>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read.
        </span>
        <span>🤎 {post.heartCount} Hearts</span>
      </footer>
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`} passHref>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
