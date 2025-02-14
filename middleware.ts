/* import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If token exists, decode it to check for the user's privileges
  if (token) {
    const decodedToken = jwt.decode(token) as { privileges: string[] }; // Decode the JWT token

    const verifiedToken = await verifyToken(token);
    if (!verifiedToken && (request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/recover") ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

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

    if (!token && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/recover") {
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
 */

//secured middleware
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/recover"];

  // 1. Handle requests with token
  if (token) {
    const verifiedToken = await verifyToken(token);

    // Invalid token handling
    if (!verifiedToken) {
      // Clear invalid token
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");

      // Only redirect if trying to access protected routes
      if (!publicPaths.includes(path)) {
        return response;
      }
      return NextResponse.next();
    }

    const decodedToken = jwt.decode(token) as { privileges: string[] }; // Decode the JWT token

    // Valid token handling
    const isSuperAdmin = decodedToken.privileges?.includes("isSuperAdmin");

    // Redirect away from auth pages when logged in
    if (publicPaths.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Super admin access control
    if (path.startsWith("/dashboard") && !isSuperAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect super admins to dashboard from non-dashboard pages
    if (isSuperAdmin && !path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // 2. Handle requests without token
  if (!publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/recover",
    "/dashboard",
    "/dashboard/:path*",
    "/depart",
    "/etablissement",
    "/statistique",
    "/",
  ],
};
