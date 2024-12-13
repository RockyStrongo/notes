import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/"];

  if (!protectedRoutes.includes(request.nextUrl.pathname)) {
    return;
  }

  if (!request.cookies.get("usr")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
