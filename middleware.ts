import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authAdapter, authConfig } from "./lib/auth";
import { cookies } from "next/headers";
import db from "./db/edge";

export const { auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async authorized({ auth }) {
      if (!auth || auth.user.email == "") {
        const cookieHandler = await cookies();
        const sessionToken = cookieHandler.get("next-auth.session-token");
        if (!sessionToken) return false;

        const getSession = authAdapter.getSessionAndUser;
        if (!getSession) return false;

        const sessionRes = await getSession(sessionToken.value);
        if (!sessionRes) return false;

        const userId = sessionRes.session.userId;

        const user = await db.query.usersTable.findFirst({
          where: (users, { eq }) => eq(users.id, userId),
        });

        return user != null;
      }

      const user = await db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.id, auth.userId ?? ""),
      });

      return user != null;
    },
  },
});

const handler = auth((req) => {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = req.auth;

  if (!session && path === "/signout") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/signout", req.url));
  }
  return NextResponse.next();
});

export default handler;

export const config = { matcher: ["/dashboard", "/account"] };
