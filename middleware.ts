import withAuth, {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
} from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";
import prisma_edge from "@/lib/prisma_edge";

async function middleware(
  req: NextRequestWithAuth,
  _: NextFetchEvent,
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
      const email = token?.email;

      if (!email || email === "") return false;

      const user = await prisma_edge.user.findUnique({
        where: {
          email: token!.email ?? "",
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

export const config = { matcher: ["/dashboard"] };
