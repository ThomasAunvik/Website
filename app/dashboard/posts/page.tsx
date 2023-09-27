import prisma from "@/lib/prisma";

const PostsPage = async () => {
  const data = prisma.post.findMany({
    select: { title: true, createdAt: true, updatedAt: true },
  });

  return <div>Posts</div>;
};

export default PostsPage;
