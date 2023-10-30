"use client";

import { Input } from "@/components/ui/input";
import { postFormAction } from "./PostFormSubmit";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { Form } from "react-hook-form";
import { PostSchema } from "./PostFormValidate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useActionForm } from "@/components/Forms/ActionForm";

const PostForm = () => {
  const { form, formAction } = useActionForm(
    PostSchema,
    { title: "Hello " },
    postFormAction,
    {}
  );

  return (
    <Form {...form}>
      <form action={formAction}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="name" placeholder="" {...field} />
              </FormControl>
              <div className="h-6">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Input name="title" type="text" />
        <SubmitButton />
      </form>
    </Form>
  );
};

export default PostForm;
