import { NextRequest, NextResponse } from "next/server";
import { IUser, Role } from "./types/user";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  try {
    const currentUser = request.cookies.get('user')?.value
    const pathname = request.nextUrl.pathname;

    if (!currentUser && !pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (currentUser) {
      const user = JSON.parse(currentUser) as IUser

      if (!user.isApproved) {
        const cookieStore = await cookies()
        cookieStore.delete('user').delete('token')
        return NextResponse.redirect(new URL('/login', request.url));
      }
      switch (user.role) {
        case Role.User:
          if (!pathname.startsWith("/account")) {
            return NextResponse.redirect(new URL("/account/dashboard", request.url));
          }
          break;
        case Role.Admin:
          if (!pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
          }
          break;
      }
      return NextResponse.next();
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
