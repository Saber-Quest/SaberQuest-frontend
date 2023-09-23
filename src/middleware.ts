import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  //Fake Auth-check, for now
  let authed = false;
  let authCookie = request.cookies.get("auth");
  if (authCookie) {
    authed = true;
  }

  //Authed Section
  if (!authed || !authCookie) {
    if (request.nextUrl.pathname === "/profile") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    if (request.nextUrl.pathname === "/profile") {
      const url = request.nextUrl.clone();
      url.pathname = `/profile/${authCookie.value}`;
      return NextResponse.redirect(url);
    }
  }

  //URL Redirects
  if (request.nextUrl.pathname === "/leaderboard") {
    const url = request.nextUrl.clone();
    url.pathname = "/leaderboard/1";
    return NextResponse.redirect(url);
  }
}
