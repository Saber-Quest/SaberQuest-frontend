import { NextApiRequest, NextApiResponse } from "next";
import { Redirects as R } from "@lib/enums/LoginRedirects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { redirect } = req.query as unknown as { redirect: string };

  if (
    typeof redirect !== "string" ||
    !Object.values(R).includes(redirect as R)
  ) {
    res.status(400).json({ error: { message: "Invalid redirect" } });
  } else {
    res.redirect(
      `${process.env.SQ_LOGINURL}/${redirect}?callback=${process.env.SQ_CALLBACK}`,
    );
  }
}
