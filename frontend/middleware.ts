import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Define public routes that don't require authentication
const publicRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Retrieve the auth token from cookies
  const token = request.cookies.get("token")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 3. If the user is NOT logged in and trying to access a protected route
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    // Optional: Keep track of where they were trying to go
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. If the user IS logged in and trying to access login/register pages
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 5. Allow request to proceed normally
  return NextResponse.next();
}

// 6. Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, SVGs, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};