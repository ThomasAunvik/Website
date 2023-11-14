"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PasswordlessLogin } from "../Account/PasswordlessLogin";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LoginSchema } from "./authvalidate";
import React from "react";
import { SubmitButton } from "../Forms/SubmitButton";
import * as v from "valibot";

export interface LoginFormProps {
  isModal?: boolean;
}

export const LoginForm = (props: LoginFormProps) => {
  const { isModal } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<v.Input<typeof LoginSchema>>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginFormSubmit = (values: v.Input<typeof LoginSchema>) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    }).then((res) => {
      if (res?.error) {
        setLoading(false);
        toast.error(res?.error);
      } else {
        router.refresh();
        if (isModal) {
          router.back();
        } else {
          router.push("/");
        }
      }
    });
  };

  const loginForm = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(loginFormSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="test@test.com" {...field} />
              </FormControl>
              <div className="h-6">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <div className="h-6">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center space-y-4">
          <SubmitButton loading={loading}>Sign In</SubmitButton>
          <Separator style={{ height: "2px" }} />
          <PasswordlessLogin isModal={isModal} />
          <Button
            type="button"
            onClick={() => {
              signIn("github");
            }}
            className={`flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            <span className="flex flex-row align-middle">
              <span className="mr-2">Sign In with</span>
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </span>
          </Button>
          <p className="text-center text-sm ">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              target="_blank"
              className="font-semibold underline"
            >
              Sign up
            </Link>{" "}
            for free.
          </p>
        </div>
      </form>
    </Form>
  );

  return loginForm;
};
