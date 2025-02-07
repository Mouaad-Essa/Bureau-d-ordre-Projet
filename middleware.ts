import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If token exists, decode it to check for the user's privileges
  if (token) {
    const decodedToken = jwt.decode(token) as { privileges: string[] }; // Decode the JWT token
    console.log(decodedToken);

    // Check if the user has the isSuperAdmin privilege
    const isSuperAdmin = decodedToken?.privileges.includes("isSuperAdmin");

    // If user is logged in and trying to access /login or /recover, redirect to /dashboard
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/recover"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user doesn't have isSuperAdmin privilege, redirect from /dashboard to another page (e.g., /)
    if (!isSuperAdmin && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If user is a SuperAdmin, allow them to access /dashboard and subpaths
    if (isSuperAdmin && !request.nextUrl.pathname.startsWith("/dashboard")) {
      // Redirect SuperAdmin to the dashboard if they try to access a non-dashboard page
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If the user is not logged in, redirect from protected pages (like /dashboard)
  if (
    !token &&
    (request.nextUrl.pathname === "/dashboard" ||
      request.nextUrl.pathname.startsWith("/dashboard/"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Define which routes the middleware applies to
export const config = {
  matcher: [
    "/login",
    "/recover",
    "/register",
    "/dashboard",
    "/dashboard/:path*",
    "/depart",
    "/etablissement",
    "/statistique",
    "/",
  ],
};
