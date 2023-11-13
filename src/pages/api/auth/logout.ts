import { NextApiRequest, NextApiResponse } from "next";
export default async function AuthRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    res.setHeader(
      "Set-Cookie",
      "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: { message: "An error occurred" } });
  }
}
