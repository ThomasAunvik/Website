import withAuth, {
  NextAuthMiddlewareOptions,
  NextMiddlewareWithAuth,
  NextRequestWithAuth,
} from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";
import prisma_edge from "@/lib/prisma_edge";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextMiddlewareResult } from "next/dist/server/web/types";

const middleware: NextMiddlewareWithAuth = async (
  request: NextRequestWithAuth,
  _event: NextFetchEvent,
): Promise<NextMiddlewareResult> => {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = request.nextauth;

  if (!session && path === "/signout") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/signout", request.url));
  }
  return NextResponse.next();
};

const middlewareOptions: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: async ({ token, req }) => {
      if (!token || token.email == "") {
        const cookieHandler = req.cookies;
        const sessionToken = cookieHandler.get("next-auth.session-token");
        if (!sessionToken) return false;

        const adapter = PrismaAdapter(prisma_edge);
        const getSession = adapter.getSessionAndUser;
        if (!getSession) return false;

        const sessionRes = await getSession(sessionToken.value);
        if (!sessionRes) return false;

        const userId = sessionRes.session.userId;
        const user = await prisma_edge.user.findUnique({
          where: {
            id: userId,
          },
        });

        return user != null;
      }

      const user = await prisma_edge.user.findUnique({
        where: {
          email: token.email ?? "",
        },
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
