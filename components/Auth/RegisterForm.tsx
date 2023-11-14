"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
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
import { RegisterSchema } from "./authvalidate";
import React from "react";
import { onRegisterSubmit } from "./actions";
import { SubmitButton } from "../Forms/SubmitButton";
import { handleSubmitForm } from "@/lib/utils/formclientaction";
import * as v from "valibot";

export interface RegisterFormProps {
  isModal?: boolean;
}

export const RegisterForm = (props: RegisterFormProps) => {
  const { isModal } = props;

  const form = useForm<v.Input<typeof RegisterSchema>>({
    resolver: valibotResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginForm = (
    <Form {...form}>
      <form onSubmit={handleSubmitForm(form, onRegisterSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="username" placeholder="testuser" {...field} />
              </FormControl>
              <div className="h-6">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
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
          <SubmitButton loading={form.formState.isLoading}>
            Sign Up
          </SubmitButton>
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
            Already have an account?{" "}
            <Link
              href="/login"
              target="_blank"
              className="font-semibold underline"
            >
              Sign in
            </Link>{" "}
            instead.
          </p>
        </div>
      </form>
    </Form>
  );

  return loginForm;
};
