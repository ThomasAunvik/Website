import PostForm from "@/components/Dashboard/Posts/PostForm";
import db from "@/db/edge";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

export interface PostPageProps {
  params: { postId: string };
}

const PostPage = async (props: PostPageProps) => {
  const { params } = props;

  const post = await db.query.postsTable.findFirst({
    where: (p, { eq }) => eq(p.postId, params.postId),
    columns: {
      postId: true,
      title: true,
      undertitle: true,
      content: true,
    },
  });

  return <PostForm post={post} />;
};

export default PostPage;
