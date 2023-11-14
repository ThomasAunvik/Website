"use client";

import { FieldPath, UseFormReturn } from "react-hook-form";
import * as v from "valibot";
import { ActionResponse } from "../validate";
import toast from "react-hot-toast";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export const handleSubmitForm = <T extends v.ObjectSchema<any>>(
  form: UseFormReturn<v.Input<T>>,
  action: (data: v.Input<T>) => Promise<ActionResponse<T, {}>>
) => {
  const onSubmit = async (values: v.Input<T>) => {
    const res = await action(values);
    switch (res.state) {
      case "success":
        break;
      case "badrequest":
        form.clearErrors();
        getEntries(res.issues).map((t) => {
          if (t) {
            const [field, error] = t;
            form.setError(field as FieldPath<v.Input<T>>, {
              message: error?.message,
            });
          }
        });
        break;
      case "error":
        toast.error(res.error ?? "Unknown Form Error");
        break;
    }
  };

  return form.handleSubmit(onSubmit);
};
