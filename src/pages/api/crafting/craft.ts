import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import rateLimit from "@lib/api/ratelimit";
import { decrypt } from "@lib/api/createSession";

const ratelimit: any = 5;
const limiter = rateLimit({
  interval: 5 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "POST") {
        const {
          item1,
          item2,
          token,
        }: { item1: string; item2: string; token: string } = req.body;

        if (!item1 || !item2) {
          return res.status(400).json({ error: "Missing recipe-item" });
        }
        if (!token) {
          return res.status(400).json({ error: "Missing token" });
        }

        const deToken = decrypt(token);

        await axios
          .post(`${process.env.API_URL}/craft`, {
            used1: item1,
            used2: item2,
            token: deToken,
          })
          .then((response) => {
            return res.status(200).json({ success: true });
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
