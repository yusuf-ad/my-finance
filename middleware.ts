import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

const publicRoutes = ["/login", "/signup"];
const protectedRoutes = [
  "/transactions",
  "/budgets",
  "/pots",
  "/recurring-bills",
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  const session = sessionData?.session;

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && session?.id) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
