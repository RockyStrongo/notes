import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/", "create-demo-user"];

  if (!protectedRoutes.includes(request.nextUrl.pathname)) {
    return;
  }

  if (!request.cookies.get("usr")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
