import * as v from "valibot";

export const PostSchema = v.object({
  title: v.string([v.minLength(1, "Title must be of minimum length")]),
});

export type PostData = v.Input<typeof PostSchema>;
