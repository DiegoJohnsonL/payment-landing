import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("session")?.value;
  const currentPath = request.nextUrl.pathname;
  const unprotectedPaths = ["/", "/login", "/checkout/*"];

  // Check if currentUser exists
  if (currentUser) {
    if (currentPath === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Check if the current path is in the unprotectedPaths array
  for (const path of unprotectedPaths) {
    if (path.endsWith("*") && currentPath.startsWith(path.slice(0, -2))) {
      return NextResponse.next();
    } else if (currentPath === path) {
      return NextResponse.next();
    }
  }

  // Store the original requested path in a session cookie
  request.cookies.set("redirectPath", currentPath);

  // Redirect to "/login" for unauthenticated users
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|.*\\.png$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
