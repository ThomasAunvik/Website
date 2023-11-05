"use server";

import { actionvalidate, actionvalidate2 } from "@/lib/validate";
import { PostSchema } from "./PostFormValidate";

export const postFormAction = actionvalidate(PostSchema)(async (
  state,
  form
) => {
  console.log("Recieved Action: ", form);

  return state;
});

export const postFormAction2 = actionvalidate2(PostSchema)(async (form) => {
  console.log("Recieved Action: ", form);
});
