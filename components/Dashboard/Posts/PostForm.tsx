import { Input } from "@mui/material";
import { postFormAction } from "./PostFormSubmit";

const PostForm = () => {
  return (
    <form action={postFormAction}>
      <Input name="title" type="text" />
    </form>
  );
};

export default PostForm;
