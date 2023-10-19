import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import GithubProvider from "next-auth/providers/github";
import { verifyPasswordless } from "./passwordless";
import db, {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTokensTable,
} from "@/db";
import { BuildColumns, eq } from "drizzle-orm";
import { PromiseReturnType } from "./utils/promise";
import {
  PgColumnBuilderBase,
  PgTableExtraConfig,
  PgTableFn,
} from "drizzle-orm/pg-core";
import { dbSchema } from "@/db/schema/schema";

const getUser = async (userId: string) => {
  return await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};

export type UserSession = PromiseReturnType<typeof getUser>;

export const pgTableHijack: any = (
  name: string,
  columns: Record<string, PgColumnBuilderBase>,
  extraConfig?: (
    self: BuildColumns<string, Record<string, PgColumnBuilderBase>, "pg">,
  ) => PgTableExtraConfig,
) => {
  switch (name) {
    case "user":
      return usersTable;
    case "account":
      return accountsTable;
    case "session":
      return sessionsTable;
    case "verificationToken":
      return verificationTokensTable;
    default:
      return dbSchema.table(name, columns, extraConfig);
  }
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db, pgTableHijack as unknown as PgTableFn<undefined>),
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user, token }) {
      session.userId = user.id;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      return {
        ...token,
        userId: user.id,
      };
    },
    async redirect({ url, baseUrl }) {
      // Do not allow login/signout redirects
      if (url.startsWith(`${baseUrl}/login`)) return baseUrl;
      if (url.startsWith(`${baseUrl}/signout`)) return baseUrl;

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(login) {
        const { email, password } = login ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }

        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.email, email),
          with: { credentials: true },
        });

        if (!user) {
          // Sleep so that it doesn't immidiately fail if no user exist
          await new Promise((r) => setTimeout(r, 2000));
          throw new Error("Invalid username or password");
        }

        const { credentials, ...userData } = user;
        console.log("Timeout", user);

        var loggedIn = false;
        for (
          var credentialIndex = 0;
          credentialIndex < credentials.length;
          credentialIndex++
        ) {
          const { type, credentialsData, secretData } =
            credentials[credentialIndex];

          if (type == "password") {
            const { algorithm, hashIteration } = credentialsData as {
              algorithm: string;
              hashIteration: number;
            };

            const { value, salt } = secretData as {
              value: string;
              salt: string;
            };

            if (
              await verifyPassword(password, {
                credentialsData: {
                  algorithm: algorithm,
                  hashIteration: hashIteration,
                },
                secretData: { value: value, salt: salt },
              })
            ) {
              loggedIn = true;
              break;
            }
          }
        }

        if (!loggedIn) {
          if (credentials.length == 0) {
            // Sleep so that it doesn't immidiately fail if no credentials exists
            await new Promise((r) => setTimeout(r, 2000));
          }
          throw new Error("Invalid username or password");
        }

        return userData;
      },
    }),
    CredentialsProvider({
      id: "passkey",
      name: "passkey",
      credentials: {
        passkey: { label: "Passkey", type: "passkey" },
      },
      async authorize(login) {
        const { passkey } = login ?? {};
        if (!passkey) {
          throw new Error("Missing username or passkey");
        }

        const response = await verifyPasswordless(passkey);
        if (!response.success) {
          throw new Error("Invalid Passkey");
        }

        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.id, response.userId),
        });

        if (!user) {
          // Sleep so that it doesn't immidiately fail if no user exist
          await new Promise((r) => setTimeout(r, 2000));
          throw new Error("Invalid Passkey");
        }

        return user;
      },
    }),
  ],
};

interface Password {
  secretData: {
    value: string;
    salt: string;
  };
  credentialsData: {
    hashIteration: number;
    algorithm: string;
  };
}

export const generateStoredPassword = async (password: string) => {
  return new Promise<Password>((resolve, fail) => {
    const salt = crypto.randomBytes(16);

    const hashIteration = 27500;
    const digest = "sha512";
    const type = "pbkdf2";
    const algorithm = type + "-" + digest;

    crypto.pbkdf2(
      password,
      salt,
      hashIteration,
      64,
      digest,
      (err, derivedKey) => {
        if (err) return fail(err);

        return resolve({
          secretData: {
            value: derivedKey.toString("base64"),
            salt: salt.toString("base64"),
          },
          credentialsData: {
            hashIteration,
            algorithm,
          },
        });
      },
    );
  });
};

export const verifyPassword = async (input: string, pass: Password) => {
  const digest = pass.credentialsData.algorithm.split("-")[1];

  return await verifyCredential(
    input,
    Buffer.from(pass.secretData.salt, "base64"),
    Buffer.from(pass.secretData.value, "base64"),
    pass.credentialsData.hashIteration,
    64,
    digest,
  );
};

export const verifyCredential = async (
  input: string,
  salt: Buffer,
  hash: Buffer,
  iterations: number,
  hashBytes: number,
  digest: string,
) => {
  return new Promise<boolean>((resolve, fail) => {
    crypto.pbkdf2(input, salt, iterations, hashBytes, digest, (err, verify) => {
      if (err) fail(err);

      const isValid = verify.toString("binary") === hash.toString("binary");
      resolve(isValid);
    });
  });
};
