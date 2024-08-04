import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = 2;
const limiter = rateLimit({
  interval: 60 * 1000,
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
        const { userinfo, message, type } = req.body;

        if (!userinfo || !message || !type) {
          return res.status(400).json({ error: "Missing fields" });
        }

        await axios
          .post(`${process.env.DISCORD_WEBHOOK}`, {
            content: null,
            username: userinfo.username,
            avatar_url: userinfo.images.avatar,
            embeds: [
              {
                title: "New feedback:",
                color: 16763987,
                fields: [
                  {
                    name: "Type:",
                    value: type,
                  },
                  {
                    name: "Message:",
                    value: message,
                  },
                ],
                footer: {
                  text: `By: ${userinfo.username}`,
                },
                timestamp: new Date(),
              },
            ],
          })
          .then(() => {
            return res.status(200).json({ message: "Feedback sent!" });
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
