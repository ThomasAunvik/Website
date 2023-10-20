import PostForm from "@/components/Dashboard/Posts/PostForm";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1

const NewPostPage = () => {
  return (
    <div>
      <div>New Post</div>
      <PostForm />
    </div>
  );
};

export default NewPostPage;
