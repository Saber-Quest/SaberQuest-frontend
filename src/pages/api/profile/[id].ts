import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import { User } from "@lib/types/User";
import axios from "axios";

const ratelimit: number = 100;
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function getFullUserdata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
    );
    res.status(200).end();
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );

  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      const { id } = req.query as unknown as { id: string };
      let result: User | boolean;

      if (req.method == "GET") {
        try {
          const response = await axios.get(
            `https://dev.saberquest.xyz/profile/${id}`
          );
          if (response.status == 200 || response.status == 302) {
            result = response.data;
          } else {
            result = false;
          }
        } catch (error) {
          result = false;
        }

        result = {
          userInfo: {
            id: "76561198410971373",
            username: "ACC | Sands",
            images: {
              avatar: "https://saberquest.xyz/avatar/76561198410971373.png",
              banner: "https://saberquest.xyz/banner/76561198410971373.png",
              border: "https://saberquest.xyz/border/76561198410971373.png",
            },
            preference: "ss",
          },
          chistory: [1, 2, 7],
          items: [
            {
              id: "bn",
              image: "/assets/images/icons/blue_notes_icon.png",
              name: "Blue Notes",
              amount: 15,
            },
            {
              id: "br",
              image: "/assets/images/icons/bomb_reset_icon.png",
              name: "Bomb Reset",
              amount: 1,
            },
            {
              id: "bs",
              image: "/assets/images/icons/blue_saber_icon.png",
              name: "Blue Saber",
              amount: 34,
            },
            {
              id: "rto",
              image: "/assets/images/icons/red_tower.png",
              name: "Red Tower",
              amount: 1,
            },
            {
              id: "sp",
              image: "/assets/images/icons/silver_pieces_icon.png",
              name: "Silver Pieces",
              amount: 1,
            },
          ],
          stats: {
            challengesCompleted: 14,
            rank: 1,
            qp: 28,
            value: 56,
          },
          today: {
            diff: 2,
            completed: true,
          },
        };

        if (!result) {
          res.status(404).json({ error: { message: "User not found" } });
        } else {
          res.status(200).json(result);
        }
      } else {
        res.status(405).json({ error: { message: "Method not allowed" } });
      }
    } catch (err: any) {
      res.status(500).json({ error: { message: err } });
    }
  } catch {
    res.status(429).json({ error: { message: "Too many requests" } });
  }
}
