import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("Test", req.nextauth.token);

    const session = req.nextauth;

    const path = req.nextUrl.pathname;

    // If it's the root path, just render it
    if (path === "/") {
      return NextResponse.next();
    }

    if (!session && path === "/signout") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/signout", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const config = { matcher: ["/admin"] };
