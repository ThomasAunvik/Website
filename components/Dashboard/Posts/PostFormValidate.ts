import * as v from "valibot";

export const PostSchema = v.object({
  title: v.string([v.minLength(1, "Title must be of minimum length")]),
  description: v.string([
    v.minLength(1, "Description must be of minimum length"),
  ]),
  content: v.string([v.minLength(1, "Content must be of minimum length")]),
});

export type PostData = v.Input<typeof PostSchema>;
