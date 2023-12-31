import { Button } from "@/components/ui/button";
import db from "@/db/edge";
import Link from "next/link";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

const getPosts = async () => {
  const posts = await db.query.postsTable.findMany({
    columns: {
      postId: true,
      title: true,
      createdAt: true,
    },
    with: {
      createdBy: {
        columns: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: (posts, { asc }) => [asc(posts.createdAt)],
  });

  return posts;
};

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <div>Posts</div>
      <div>
        <Link href="/dashboard/posts/new">
          <Button>Create New Post</Button>
        </Link>
      </div>
      <ol>
        {posts.map((p) => (
          <li key={`post-${p.postId}`}>
            {p.title}{" "}
            <Link href={`/dashboard/posts/${p.postId}`}>
              <Button>Go To Post...</Button>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PostsPage;
