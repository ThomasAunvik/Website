"use server";

import { actionvalidate } from "@/lib/validate";
import { PostSchema } from "./PostFormValidate";

export const postFormAction = actionvalidate(PostSchema)(async (
  state,
  form
) => {
  console.log("Recieved Action: ", form);

  return state;
});
