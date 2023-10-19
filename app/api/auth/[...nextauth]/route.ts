import NextAuth, { CallbacksOptions, NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/auth_options";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { encode, decode, JWTOptions } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import { pgTableHijack } from "@/lib/utils/pgTableHijack";

const handler = async (req: NextRequest, _: any) => {
  const adapter = DrizzleAdapter(db, pgTableHijack);

  const callbacks: Partial<CallbacksOptions> = {
    signIn: async ({ user }) => {
      // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
      if (
        req.url?.includes("callback") &&
        (req.url?.includes("credentials") || req.url?.includes("passkey")) &&
        req.method === "POST"
      ) {
        if (user && adapter) {
          const sessionToken = generateSessionToken(); // Implement a function to generate the session token (you can use randomUUID as an example)
          const sessionMaxAge = 60 * 60 * 24 * 30; //30Days
          const sessionExpiry = fromDate(sessionMaxAge);

          await adapter.createSession!({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          });

          const cookieHandler = cookies();

          cookieHandler.set("next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
          });
        }
      }

      return true;
    },
  };

  const jwtOptions: Partial<JWTOptions> = {
    encode: async ({ token, secret, maxAge }) => {
      if (
        req.url?.includes("callback") &&
        (req.url?.includes("credentials") || req.url?.includes("passkey")) &&
        req.method === "POST"
      ) {
        const cookieHandler = cookies();
        const cookie = cookieHandler.get("next-auth.session-token");

        if (cookie) return cookie.value;
        else return "";
      }
      // Revert to default behaviour when not in the credentials provider callback flow
      return encode({ token, secret, maxAge });
    },
    decode: async ({ token, secret }) => {
      if (
        req.url?.includes("callback") &&
        (req.url?.includes("credentials") || req.url?.includes("passkey")) &&
        req.method === "POST"
      ) {
        return null;
      }

      // Revert to default behaviour when not in the credentials provider callback flow
      return decode({ token, secret });
    },
  };

  const options: NextAuthOptions = {
    ...authOptions,
    adapter: adapter,
    callbacks: {
      ...authOptions.callbacks,
      ...callbacks,
    },
    jwt: {
      ...authOptions.jwt,
      ...jwtOptions,
    },
  };

  return NextAuth(options);
};

export { handler as GET, handler as POST };

const generateSessionToken = () => {
  // Use `randomUUID` if available. (Node 15.6++)
  return randomUUID?.();
};

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};
