import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession } from "@lib/api/createSession";
import { SessionUser } from "@lib/types";

export async function middleware(request: NextRequest) {
  const response = await NextResponse.next();

  let authCookie = request.cookies.get("auth");
  let authData: SessionUser | null = null;
  if (authCookie) {
    authData = readSession(authCookie.value);
  }

  // Authed Section
  if (authData == null) {
    if (request.nextUrl.pathname === "/profile") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    if (request.nextUrl.pathname === "/shop") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
  if (authData != null) {
    if (request.nextUrl.pathname === "/profile") {
      const url = request.nextUrl.clone();
      url.pathname = `/profile/${authData.id}`;
      return NextResponse.redirect(url);
    }
  }

  // URL Redirects
  if (request.nextUrl.pathname === "/leaderboard") {
    const url = request.nextUrl.clone();
    url.pathname = "/leaderboard/1";
    return NextResponse.redirect(url);
  }

  return response; // Return the response after handling everything
}
