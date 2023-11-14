"use server";

import { actionvalidate } from "@/lib/validate";
import { PostSchema } from "./PostFormValidate";
import { redirect } from "next/navigation";

export const postFormAction = actionvalidate(PostSchema)(async (form) => {
  console.log("Recieved Action: ", form);

  redirect("/");
});
