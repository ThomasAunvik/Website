"use client";

import { DrawerHeader } from "@/components/Dashboard/Drawer";
import PostForm from "@/components/Dashboard/Posts/PostForm";
import Modal from "@/components/Modal/Modal";

const NewPostPage = () => {
  return (
    <Modal>
      <div className="bg-slate-900 opacity-60">
        <div className="p-6">
          New Post
          <PostForm />
        </div>
      </div>
    </Modal>
  );
};

export default NewPostPage;
