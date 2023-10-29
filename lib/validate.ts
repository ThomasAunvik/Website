import * as v from "valibot";

export type ValidationResponse<T extends v.ObjectSchema<v.ObjectShape>> = {
  success?: boolean;
  issues?: { [key in keyof v.Input<T>]?: v.Issue };
  error?: string;
};

export const actionvalidate = <T extends v.ObjectSchema<v.ObjectShape>>(
  schema: T
) => {
  return <S>(
    func: (prevState: S, data: v.Input<typeof schema>) => Promise<S>
  ) => {
    return async (
      prevState: S,
      form: FormData
    ): Promise<S & ValidationResponse<T>> => {
      const data = Object.fromEntries(form);
      const result = v.safeParse(schema, data);

      if (!result.success) {
        return {
          ...prevState,
          success: false,
          issues: result.issues.reduce((acc, i) => {
            const key =
              i.path
                ?.map((p) => p.key as string)
                .join(".")
                .toString() ?? "unknown";

            return {
              ...acc,
              [key]: i,
            };
          }, {}),
        };
      }

      try {
        const returned = await func(prevState, result.output);

        const newState: S & ValidationResponse<T> = {
          ...returned,
          success: true,
          error: undefined,
          issues: undefined,
        };

        return newState;
      } catch (err) {
        const failedResponse: S & ValidationResponse<T> = {
          ...prevState,
          success: false,
          issues: undefined,
          error: err?.toString(),
        };

        return failedResponse;
      }
    };
  };
};
