import prisma from "@/lib/prisma";
import { Button, List, ListItem } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

const PostsPage = async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
    },
  });

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
          <ListItem title={p.title}></ListItem>
        ))}
      </List>
    </div>
  );
};

export default PostsPage;
