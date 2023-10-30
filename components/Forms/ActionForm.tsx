import * as v from "valibot";

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ValidationResponse } from "@/lib/validate";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useActionForm = <
  T extends v.ObjectSchema<v.ObjectShape>,
  S extends {},
>(
  schema: T,
  defaultValues: v.Input<typeof schema>,
  action: (prevState: S, form: FormData) => Promise<S & ValidationResponse<T>>,
  defaultState: S & ValidationResponse<T>
) => {
  const [state, formAction] = useFormState(action, defaultState);

  const form = useForm<v.Input<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: defaultValues as any,
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
