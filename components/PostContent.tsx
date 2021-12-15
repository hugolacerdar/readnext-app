import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface PostContentProps {
  post: {
    title: string;
    slug: string;
    uid: string;
    username: string;
    published: boolean;
    content: string;
    createdAt: number | any;
    updatedAt: number;
    heartCount: number;
  };
}

export default function PostContent({ post }: PostContentProps) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{" "}
        <Link href={`/${post.username}`}>
          <a className="text-info">@{post.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
