import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { decrypt } from "@lib/api/createSession";
import { Border } from "@lib/types";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = 10;
const limiter = rateLimit({
  interval: 10 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "PUT") {
        const {
          bo,
          t,
        }: {
          bo: Border;
          t: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!bo) {
          return res.status(400).json({ error: "Missing a valid border" });
        }
        const deToken = decrypt(t);

        if (bo.imageUrl === null) {
          bo.imageUrl = "none";
        }

        await axios
          .put(`${process.env.API_URL}/update/border`, {
            border: bo.imageUrl,
            patreonBorder: bo.patreon,
            token: deToken,
          })
          .then(() => {
            return res.status(200).json({ message: "Border updated!" });
          })
          .catch((error) => {
            return res.status(400).json({ error: error.response.data.error });
          });
      } else {
        return res.status(400).json({ error: "Invalid request method" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something bad happened" });
    }
  } catch (error) {
    return res.status(429).json({ error: "Rate limit exceeded.\n Slow down!" });
  }
}
