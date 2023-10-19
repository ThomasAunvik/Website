import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import GithubProvider from "next-auth/providers/github";
import { verifyPasswordless } from "./passwordless";
import db from "@/db";
import { PromiseReturnType } from "./utils/promise";
import { pgTableHijack } from "./utils/pgTableHijack";
import { verifyPassword } from "./utils/passwordgen";

const getUser = async (userId: string) => {
  return await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};

export type UserSession = PromiseReturnType<typeof getUser>;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db, pgTableHijack),
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;

      return session;
    },
    async jwt({ token, user }) {
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
