import * as v from "valibot";

export const PostSchema = v.object({
  title: v.string("You must write a title", [
    v.minLength(1, "Title must be of minimum length"),
  ]),
  description: v.string("You must write a description", [
    v.minLength(1, "Description must be of minimum length"),
  ]),
  content: v.string("You must write content", [
    v.minLength(1, "Content must be of minimum length"),
  ]),
});

export const UpdatePostSchema = v.object({
  postId: v.string(),
  title: v.string("You must write a title", [
    v.minLength(1, "Title must be of minimum length"),
  ]),
  undertitle: v.string("You must write a description", [
    v.minLength(1, "Description must be of minimum length"),
  ]),
  content: v.string("You must write content", [
    v.minLength(1, "Content must be of minimum length"),
  ]),
});

export type PostData = v.Input<typeof PostSchema>;
