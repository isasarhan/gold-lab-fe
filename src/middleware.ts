import { NextRequest, NextResponse } from "next/server";
import { Role } from "./types/user";
import { getAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { user } = await getAuth();

  const pathname = request.nextUrl.pathname;

  if (!user && !pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (user) {
    switch (user.role) {
      case Role.User:
        if (!pathname.startsWith("/account")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        break;
      case Role.Admin:
        if (!pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
        break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|xlsx|pdf)$).*)',
  ],
};
