import { readSession } from "@lib/api/createSession";
import { AdvancedUser } from "@lib/types";
import { SessionUser } from "@lib/types/SessionUser";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authCookie = req.cookies.auth;
  let sessionData: SessionUser | null = null;
  try {
    if (authCookie !== undefined) {
      const authData = readSession(authCookie);
      if (authData === null) {
        return res.status(200).json({ sessionData: null });
      }
      await axios
        .get(`${process.env.API_URL}/profile/${authData.id}/advanced`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            const data: AdvancedUser = response.data;
            sessionData = {
              id: authData.id,
              jwt: authData.jwt,
              created_at: authData.created_at,
              user: data,
            };
            return res.status(200).json({ sessionData });
          }
        });
    } else {
      return res.status(200).json({ sessionData: null });
    }
  } catch (error) {
    res.setHeader(
      "Set-Cookie",
      "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return res.status(500).json({ error: { message: "An error occurred" } });
  }
}
