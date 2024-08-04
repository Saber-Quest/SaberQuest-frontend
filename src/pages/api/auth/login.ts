import { NextApiRequest, NextApiResponse } from "next";
import { createSession } from "@lib/api/createSession";

export default async function AuthRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.query.token as string;
  const id = req.query.id as string;

  try {
    if (token === undefined || typeof token !== "string") {
      return res.status(400).json({ message: "Invalid token or id" });
    }

    const authCookie = req.cookies.auth;

    if (authCookie !== undefined) {
      return res.redirect("/profile");
    }

    const data = createSession(id, token);
    res.setHeader(
      "Set-Cookie",
      `auth=${data[1]}; path=/; SameSite=Lax; HttpOnly; expires=${new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 30,
      ).toUTCString()}`,
    );

    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ error: { message: "An error occurred" } });
  }
}
