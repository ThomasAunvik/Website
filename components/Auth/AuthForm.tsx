"use client";

import { useEffect, useState } from "react";
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
import {
  LoginData,
  LoginSchema,
  RegisterData,
  RegisterSchema,
} from "./authvalidate";
import React from "react";
import { useFormState } from "react-dom";
import { onRegisterSubmit } from "./actions";
import { SubmitButton } from "../Forms/SubmitButton";

export interface AuthFormProps {
  authType: "login" | "register";
  isModal?: boolean;
}

export const AuthForm = (props: AuthFormProps) => {
  const { authType, isModal } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [state, formAction] = useFormState(onRegisterSubmit, {});

  const form = useForm<LoginData | RegisterData>({
    resolver: valibotResolver(
      authType == "login" ? LoginSchema : RegisterSchema
    ),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    form.clearErrors();
    if (state.issues) {
      Object.entries(state.issues).forEach(([key, issue]) => {
        form.setError(key as any, { message: issue.message });
      });
    }

    if (state.error) {
      toast.error(state.error);
    }

    if (authType == "register" && state.success) {
      toast.success("Successfully registed...");
      if (isModal) {
        router.back();
      } else {
        router.push("/");
      }
    }
  }, [state, authType, form, isModal, router]);

  const loginFormSubmit = (values: LoginData) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      // @ts-ignore
    }).then(({ error }) => {
      console.log(error);
      if (error) {
        setLoading(false);
        toast.error(error);
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
      <form
        action={authType == "login" ? undefined : formAction}
        onSubmit={
          authType == "login" ? form.handleSubmit(loginFormSubmit) : undefined
        }
      >
        {authType == "register" && (
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
        )}
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
          <SubmitButton loading={loading}>
            {authType === "login" ? "Sign In" : "Sign Up"}
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
          {authType === "login" ? (
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
          ) : (
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
          )}
        </div>
      </form>
    </Form>
  );

  return loginForm;

  /*
  const login = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      // @ts-ignore
    }).then(({ error }) => {
      console.log(error);
      if (error) {
        setLoading(false);
        toast.error(error);
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

  const register = (e: FormEvent<HTMLFormElement>) => {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success("Account created! Redirecting to home...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        login(e);
      }}
      className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
    >
      {type == "register" && (
        <div>
          <label htmlFor="username" className="block text-xs uppercase">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="username"
            placeholder="hello-world"
            autoComplete="username"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="username@theirsite.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>
      <PasswordlessLogin isModal={isModal} />
      <button
        type="button"
        onClick={() => {
          signIn("github");
        }}
        className={`${"border-black bg-black text-white hover:bg-white hover:text-black"} flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        <span className="flex flex-row align-middle">
          <span className="mr-2">Sign In with</span>
          <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </span>
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            target="_blank"
            className="font-semibold text-gray-800"
          >
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            target="_blank"
            className="font-semibold text-gray-800"
          >
            Sign in
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );*/
};
