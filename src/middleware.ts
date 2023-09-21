import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/leaderboard") {
    const url = request.nextUrl.clone();
    url.pathname = "/leaderboard/1";
    return NextResponse.rewrite(url);
  }
}
