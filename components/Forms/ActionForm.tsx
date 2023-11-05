"use client";
import * as v from "valibot";

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ValidationResponse } from "@/lib/validate";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const testSceham = v.object({
  username: v.string("username is required", [
    v.minLength(3, "Needs to be at least 3 characters"),
    v.endsWith("cool", "Needs to end with `cool`"),
  ]),
  password: v.string("password is required"),
});

export const useActionForm = <T extends v.ObjectSchema<any>, S extends {}>(
  schema: v.ObjectSchema<any>,
  defaultValues: v.Output<T>,
  action: (prevState: S, form: FormData) => Promise<S & ValidationResponse<T>>,
  defaultState: S & ValidationResponse<T>
) => {
  const [state, formAction] = useFormState(action, defaultState);

  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: defaultValues as v.Output<typeof schema>,
  });

  useEffect(() => {
    form.clearErrors();
    if (state.issues) {
      Object.entries(state.issues).forEach(([key, issue]) => {
        if (issue) {
          form.setError(key as any, { message: issue.message });
        }
      });
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state, form]);

  return { form, state, formAction };
};
