import { getLoggedInUser } from "@/actions/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/middleware', '/server'];

export default async function middleware(request: NextRequest) {
    const user: UserDetails | null = await getLoggedInUser();

    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute && !user) {
        const absoluteUrl = new URL('/sign-in', request.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }