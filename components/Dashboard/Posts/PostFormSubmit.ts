"use server";

import { actionvalidate } from "@/lib/validate";
import { UpdatePostSchema } from "./PostFormValidate";
import db from "@/db/edge";
import { postsTable } from "@/db/schema/posts";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const postFormAction = actionvalidate(UpdatePostSchema)(async (form) => {
  console.log("Recieved Action: ", form);

  const session = await auth();
  const userId = session?.userId;
  if (!userId) {
    throw Error("Not logged in...");
  }

  const postResult = await db
    .insert(postsTable)
    .values([
      {
        title: form.title,
        undertitle: form.undertitle,
        content: form.content,
        createdById: userId,
      },
    ])
    .returning({
      postId: postsTable.postId,
    });

  const firstPost = postResult[0];

  revalidatePath(`/dashboard/posts`);

  return {
    state: "redirect",
    location: `/dashboard/posts/${firstPost.postId}`,
  };
});

export const updatePostFormAction = actionvalidate(UpdatePostSchema)(async (
  form
) => {
  console.log("Recieved Action: ", form);

  const session = await auth();
  const userId = session?.userId;
  if (!userId) {
    throw Error("Not logged in...");
  }

  const { postId, ...formData } = form;

  const postResult = await db
    .update(postsTable)
    .set(formData)
    .where(eq(postsTable.postId, postId))
    .returning({
      postId: postsTable.postId,
    });

  const firstPost = postResult[0];

  revalidatePath(`/dashboard/posts/${firstPost.postId}`);
});
