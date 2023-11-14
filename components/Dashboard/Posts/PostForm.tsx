"use client";

import * as v from "valibot";
import { Input } from "@/components/ui/input";
import { postFormAction, updatePostFormAction } from "./PostFormSubmit";
import { SubmitButton } from "@/components/Forms/SubmitButton";
import { UpdatePostSchema } from "./PostFormValidate";
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
import { handleSubmitForm } from "@/lib/utils/formclientaction";

export interface PostFormProps {
  post?: v.Input<typeof UpdatePostSchema>;
}

const PostForm = (props: PostFormProps) => {
  const { post } = props;

  const form = useForm<v.Input<typeof UpdatePostSchema>>({
    resolver: valibotResolver(UpdatePostSchema),
    defaultValues: post ?? { postId: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitForm(
          form,
          post == null ? postFormAction : updatePostFormAction
        )}
      >
        <fieldset className="max-w-md">
          <FormField
            control={form.control}
            name="postId"
            render={() => <span />}
          />
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
            name="undertitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="undertitle" placeholder="" {...field} />
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
          <SubmitButton loading={form.formState.isSubmitting}>
            Submit
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
