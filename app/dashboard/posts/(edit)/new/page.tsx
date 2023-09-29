import { DrawerHeader } from "@/components/Dashboard/Drawer";
import PostForm from "@/components/Dashboard/Posts/PostForm";

const NewPostPage = () => {
  return (
    <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-slate-900 opacity-60">
      <DrawerHeader />
      <div className="p-6">New Post</div>
      <PostForm />
    </div>
  );
};

export default NewPostPage;
