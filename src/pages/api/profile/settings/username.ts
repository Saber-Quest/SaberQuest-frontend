import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { decrypt } from "@lib/api/createSession";
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
          u,
          t,
        }: {
          u: string;
          t: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!u) {
          return res.status(400).json({ error: "Invalid username" });
        }
        const deToken = decrypt(t);

        if (!u.match(/^[A-Za-z0-9_-]*$/)) {
          return res.status(400).json({
            error:
              "Invalid username.\n\nOnly A-Z, a-z, 0-9, _ and - is allowed",
          });
        }

        if (u.length > 20 || u.length < 3) {
          return res.status(400).json({
            error:
              "Invalid username length.\n\nMin: 3 characters\nMax: 20 characters",
          });
        }

        await axios
          .put(`${process.env.API_URL}/update/username`, {
            username: u,
            token: deToken,
          })
          .then(() => {
            return res.status(200).json({ message: "Username updated!" });
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
