"use server";
import { Logger } from "next-axiom";
import * as v from "valibot";

export type BadRequestResponse<T extends v.ObjectSchema<any>> = {
  state: "badrequest";
  issues: { [key in keyof v.Input<T>]?: v.Issue };
};

export type ErrorResponse = {
  state: "error";
  error: string | undefined | null;
};

export type SuccessResponse<S extends {} | undefined> = {
  state: "success";
  data: S;
};

export type ActionResponse<
  T extends v.ObjectSchema<any>,
  S extends {} | undefined,
> = SuccessResponse<S> | BadRequestResponse<T> | ErrorResponse;

export type ValidationResponse<T extends v.ObjectSchema<any>> = {
  success?: boolean;
  issues?: { [key in keyof v.Input<T>]?: v.Issue };
  error?: string;
};

export const actionvalidate = <T extends v.ObjectSchema<any>, S extends {}>(
  schema: T,
  initialState?: S
) => {
  return (func: (data: v.Input<typeof schema>) => Promise<S | void>) => {
    return async (
      form: v.Input<typeof schema>
    ): Promise<ActionResponse<T, S>> => {
      const result = v.safeParse(schema, form);

      if (!result.success) {
        const log = new Logger();

        const issues = result.issues.reduce(
          (acc, i) => {
            const key =
              i.path
                ?.map((p) => p.key as string)
                .join(".")
                .toString() ?? "unknown";

            return {
              ...acc,
              [key]: i,
            };
          },
          {} as { [key in keyof v.Input<typeof schema>]: v.Issue }
        );

        log.info("Form Submitted Invalid Request", { issues: issues });
        await log.flush();

        return {
          state: "badrequest",
          issues: issues,
        };
      }

      try {
        const returned = await func(result.output);

        const newState: ActionResponse<T, S> = {
          state: "success",
          data: returned ?? initialState ?? ({} as S),
        };

        return newState;
      } catch (err) {
        const log = new Logger();

        if (err instanceof Error) {
          const failedResponse: ActionResponse<T, S> = {
            state: "error",
            error: err?.stack,
          };

          log.error(`Action Error: ${err?.message}`, {
            stacktrace: err?.stack,
          });
          await log.flush();

          return failedResponse;
        }

        const failedResponse: ActionResponse<T, S> = {
          state: "error",
          error: err?.toString(),
        };

        log.error(`Action Error: ${err?.toString()}`);
        await log.flush();

        return failedResponse;
      }
    };
  };
};
