import db from "@/db";
import { PromiseReturnType } from "@/lib/utils/promise";
import { Button, List, ListItem } from "@mui/material";
import Link from "next/link";

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

type PostList = PromiseReturnType<typeof getPosts>;

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
      <List>
        {posts.map((p) => (
          <ListItem key={`post-${p.postId}`} title={p.title}></ListItem>
        ))}
      </List>
    </div>
  );
};

export default PostsPage;
