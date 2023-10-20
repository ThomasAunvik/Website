import { authAdapter, authConfig } from "@/lib/auth";
import NextAuth from "next-auth";
import { JWTOptions, encode, decode } from "@auth/core/jwt";
import { CallbacksOptions } from "@auth/core/types";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = "fra1"; // only execute this function on fra1
export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  const callbacks: Partial<CallbacksOptions> = {
    signIn: async ({ user }) => {
      // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
      console.log("Signing In...");
      if (
        req.url?.includes("callback") &&
        (req.url?.includes("credentials") || req.url?.includes("passkey")) &&
        req.method === "POST"
      ) {
        if (user && authAdapter) {
          const sessionToken = generateSessionToken(); // Implement a function to generate the session token (you can use randomUUID as an example)
          const sessionMaxAge = 60 * 60 * 24 * 30; //30Days
          const sessionExpiry = fromDate(sessionMaxAge);

          await authAdapter.createSession!({
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

  const {
    handlers: { GET, POST },
  } = NextAuth({
    ...authConfig,
    jwt: { ...authConfig.jwt, ...jwtOptions },
    callbacks: { ...authConfig.callbacks, ...callbacks },
  });

  return { GET, POST };
};

const getWrapper = async (req: NextRequest) => {
  const list = await handler(req);
  return list.GET(req);
};

const postWrapper = async (req: NextRequest) => {
  const list = await handler(req);
  return list.POST(req);
};

export { getWrapper as GET, postWrapper as POST };

const generateSessionToken = () => {
  // Use `randomUUID` if available. (Node 15.6++)
  return crypto.randomUUID();
};

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};
