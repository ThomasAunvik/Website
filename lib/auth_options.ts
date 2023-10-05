import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { JsonObject } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GithubProvider from "next-auth/providers/github";

const getSessionUser = async (userId: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
};

export type SessionUser = Prisma.PromiseReturnType<typeof getSessionUser>;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user, token }) {
      session.userId = user.id;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
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

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            credentials: true,
          },
        });

        if (!user) {
          // Sleep so that it doesn't immidiately fail if no user exist
          await new Promise((r) => setTimeout(r, 2000));
          throw new Error("Invalid username or password");
        }

        const credentials = user.credentials;

        var loggedIn = false;
        for (
          var credentialIndex = 0;
          credentialIndex < credentials.length;
          credentialIndex++
        ) {
          const { type, credentialsData, secretData } =
            credentials[credentialIndex];

          if (type == "password") {
            const { algorithm, hashIteration } = credentialsData as JsonObject;
            const { value, salt } = secretData as JsonObject;
            if (
              await verifyPassword(password, {
                credentialsData: {
                  algorithm: algorithm as string,
                  hashIteration: hashIteration as number,
                },
                secretData: { value: value as string, salt: salt as string },
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

        const loggedInUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        return loggedInUser;
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

  console.log("");
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
