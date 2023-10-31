import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
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
      if (req.method === "GET") {
        const { id } = req.query as unknown as { id: string };

        if (!id) {
          return res.status(400).json({ error: "Missing valid ID" });
        }
        await axios
          .get(`${process.env.API_URL}/profile/${id}/advanced`)
          .then((response) => {
            if (response.status === 302 || response.status === 200) {
                const { data } = response;
            return res.status(200).json(data);
          }})
          .catch((error) => {
            return res.status(400).json({ error: "No information found." });
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
