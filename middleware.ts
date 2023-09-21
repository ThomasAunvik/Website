import withAuth, {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
} from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";
import _ from "lodash";

import { PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient({
  datasourceUrl: process.env.PRISMA_CONNECTION_STRING,
});

async function middleware(
  req: NextRequestWithAuth,
  _: NextFetchEvent
): Promise<NextResponse<unknown>> {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = req.nextauth;

  console.log(session);

  if (!session && path === "/signout") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/signout", req.url));
  }
  return NextResponse.next();
}

const middlewareOptions: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: async ({ token }) => {
      const email = token?.email;

      if (!email || email === "") return false;

      const user = await prisma.user.findUnique({
        where: {
          email: token!.email ?? "",
        },
      });

      return user?.admin == true;
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
