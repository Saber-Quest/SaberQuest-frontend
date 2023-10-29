import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { decrypt } from "@lib/api/createSession";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = 5;
const limiter = rateLimit({
  interval: 10 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "POST") {
        const { token, itemId } = req.body;
        if (!token) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!itemId) {
          return res.status(400).json({ error: "Missing item_id" });
        }
        const deToken = decrypt(token);

        await axios
          .post(`${process.env.API_URL}/items/shop/buy`, {
            token: deToken,
            itemId: itemId.id,
          })
          .then(() => {
            return res
              .status(200)
              .json({ message: "Item bought successfully" });
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
