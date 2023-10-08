import { FormGroup, Input, TextField } from "@mui/material";
import { postFormAction } from "./PostFormSubmit";
import { PostPreview } from "./PostPreview";

const PostForm = () => {
  return (
    <div className="flex flex-row">
      <form className="max-w-md" action={postFormAction}>
        <FormGroup className="space-y-4">
          <TextField id="title" name="title" label="Post Title" />
          <TextField
            id="description"
            name="description"
            label="Post Description"
          />

          <TextField
            id="content"
            name="content"
            label="Content"
            multiline={true}
            minRows={5}
          />
        </FormGroup>
      </form>
      <div>
        <PostPreview />
      </div>
    </div>
  );
};

export default PostForm;
