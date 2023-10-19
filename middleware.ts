import withAuth, {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "./db";
import { pgTableHijack } from "./lib/utils/pgTableHijack";

async function middleware(
  req: NextRequestWithAuth,
): Promise<NextResponse<unknown>> {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = req.nextauth;

  if (!session && path === "/signout") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/signout", req.url));
  }
  return NextResponse.next();
}

const middlewareOptions: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: async ({ token, req }) => {
      if (!token || token.email == "") {
        const cookieHandler = req.cookies;
        const sessionToken = cookieHandler.get("next-auth.session-token");
        if (!sessionToken) return false;

        const adapter = DrizzleAdapter(db, pgTableHijack);
        const getSession = adapter.getSessionAndUser;
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
        where: (users, { eq }) => eq(users.email, token.email ?? ""),
      });

      return user != null;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
    newUser: "/register",
  },
};

export default withAuth(middleware, middlewareOptions);

export const config = { matcher: ["/dashboard", "/account"] };
