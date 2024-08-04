import { NextResponse, NextRequest } from "next/server";
import { readSession } from "@lib/api/createSession";
import { SessionUser } from "@lib/types";

export async function middleware(request: NextRequest) {
  const response = await NextResponse.next();

  const admin = false;

  let authCookie = request.cookies.get("auth");
  let authData: SessionUser | null = null;
  if (authCookie) {
    authData = readSession(authCookie.value);
  }

  // Authed Section
  if (authData === null) {
    response.cookies.set("auth", "", { expires: new Date(0) });
    if (
      request.nextUrl.pathname === "/profile" ||
      request.nextUrl.pathname === "/profile/settings" ||
      request.nextUrl.pathname === "/profile/crafting" ||
      request.nextUrl.pathname === "/shop" ||
      request.nextUrl.pathname === "/feedback" ||
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
  if (authData !== null) {
    if (request.nextUrl.pathname === "/profile") {
      const url = request.nextUrl.clone();
      url.pathname = `/profile/${authData.id}`;
      return NextResponse.redirect(url);
    }
    if (!admin && request.nextUrl.pathname.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
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
