import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.string("Email must be a string", [
    v.minLength(1, "Please enter your email"),
    v.email("The email address is invalid"),
  ]),
  password: v.string("Password must be a string", [
    v.minLength(1, "Please enter your password."),
  ]),
});

export type LoginData = v.Input<typeof LoginSchema>;

export const RegisterSchema = v.object({
  username: v.string("Username must be a string", [
    v.minLength(1, "Please enter your username"),
  ]),
  email: v.string("Email must be a string", [
    v.minLength(1, "Please enter your email"),
    v.email("The email address is invalid"),
  ]),
  password: v.string("Password must be a string", [
    v.minLength(1, "Please enter your password."),
    v.minLength(8, "Your password must have 8 characters or more"),
  ]),
});

export type RegisterData = v.Input<typeof RegisterSchema>;
