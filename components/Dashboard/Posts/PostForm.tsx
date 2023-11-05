"use client";

import * as v from "valibot";
import { Input } from "@/components/ui/input";
import { postFormAction2 } from "./PostFormSubmit";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { PostSchema } from "./PostFormValidate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

const PostForm = () => {
  const form = useForm<v.Output<typeof PostSchema>>({
    resolver: valibotResolver(PostSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: v.Output<typeof PostSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const res = await postFormAction2(values);
    console.log("Res: ", res);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="max-w-md">
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="description" placeholder="" {...field} />
                </FormControl>
                <div className="h-6">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <div className="h-6">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </fieldset>
        <div className="max-w-xs mt-4">
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
