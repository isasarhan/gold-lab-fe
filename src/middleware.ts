import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  try {
    const session = await auth()
    const pathname = request.nextUrl.pathname;

    if (!session && !pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }
  catch (e) {
    console.error("Middleware error", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|xlsx|pdf)$).*)',
  ],
};
