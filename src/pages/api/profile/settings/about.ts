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
          a,
          t,
        }: {
          a: string;
          t: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!a) {
          return res.status(400).json({ error: "Missing a valid about" });
        }
        const deToken = decrypt(t);

        if (
          !a.match(
            /^[\x00-\x7F\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u036FA-Za-z0-9_-]*$/,
          )
        ) {
          return res.status(400).json({
            error:
              "Invalid about.\n\nOnly A-Z, a-z, 0-9, nordic letters, _ and - is allowed",
          });
        }

        if (a.length > 200) {
          return res
            .status(400)
            .json({ error: "Invalid about length.\n\nMax: 200 characters" });
        }

        await axios
          .put(`${process.env.API_URL}/update/about`, {
            about: a,
            token: deToken,
          })
          .then(() => {
            return res.status(200).json({ message: "About updated!" });
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
