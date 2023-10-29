import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import GithubProvider from "next-auth/providers/github";
import { verifyPasswordless } from "./passwordless";
import db from "@/db/edge";
import { PromiseReturnType } from "./utils/promise";
import { pgTableHijack } from "./utils/pgTableHijack";
import { verifyPassword } from "./utils/passwordgen";

import { Logger } from "next-axiom";

const getUser = async (userId: string) => {
  return await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};

export type UserSession = PromiseReturnType<typeof getUser>;

export const authAdapter = DrizzleAdapter(db, pgTableHijack);

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: authAdapter,
  session: { strategy: "database" },
  pages: {
    signIn: "/login",
    signOut: "/signout",
    newUser: "/register",
  },
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      return {
        ...token,
        userId: user.id,
      };
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Do not allow login/signout redirects
      if (url.startsWith(`${baseUrl}/login`)) return baseUrl;
      if (url.startsWith(`${baseUrl}/signout`)) return baseUrl;

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user }) {
      const log = new Logger();
      log.info("User logged in (signin callback)", {
        userId: user.id,
        email: user.email,
      });
      await log.flush();

      return true;
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
        const log = new Logger();

        const email = login.email as string | undefined;
        const password = login.password as string | undefined;
        if (!email || !password) {
          log.info("Attempted login, Missing username or password", { email });
          await log.flush();
          throw new Error("Missing username or password");
        }

        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.email, email),
          with: { credentials: true },
        });

        if (!user) {
          log.info("Attempted login, User not found", { email });
          await log.flush();
          // Sleep so that it doesn't immidiately fail if no user exist
          await new Promise((r) => setTimeout(r, 2000));
          throw new Error("Invalid username or password");
        }

        const { credentials, ...userData } = user;

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
            log.warn(
              "Attempted login, user does not have any credentials set up",
              { userId: user.id, email: user.email }
            );
            // Sleep so that it doesn't immidiately fail if no credentials exists
            await new Promise((r) => setTimeout(r, 2000));
          } else {
            log.info("Attempted login, Invalid Password", {
              userId: user.id,
              email: user.email,
            });
          }
          await log.flush();
          throw new Error("Invalid username or password");
        }

        log.info("User logged in", {
          userId: user.id,
          email: user.email,
        });

        await log.flush();
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
        const log = new Logger();

        const passkey = login.passkey as string | undefined;
        if (!passkey) {
          log.info("Attempted login with passkey, Missing passkey");
          await log.flush();
          throw new Error("Missing username or passkey");
        }

        const response = await verifyPasswordless(passkey);
        if (!response.success) {
          log.info("Attempted login with passkey, Invalid passkey", {
            passkey: response,
          });
          await log.flush();
          throw new Error("Invalid Passkey");
        }

        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.id, response.userId),
        });

        if (!user) {
          log.warn("Attempted login with passkey, User not found", {
            passkey: response,
          });
          await log.flush();
          // Sleep so that it doesn't immidiately fail if no user exist
          await new Promise((r) => setTimeout(r, 2000));
          throw new Error("Invalid Passkey");
        }

        log.info("User logged in with passkey", {
          userId: user.id,
          email: user.email,
          passkey: response,
        });

        await log.flush();
        return user;
      },
    }),
  ],
};

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);
