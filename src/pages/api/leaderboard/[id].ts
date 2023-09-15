import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "@lib/api/ratelimit";
import { LeaderboardData } from "@lib/types/Leaderboard";

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
      let leaderboard: LeaderboardData | null;
      const page = parseInt(id);
      if (req.method == "GET") {
        if (page === 1) {
        leaderboard = {
          leaderboard: [
            {
              userInfo: {
                id: "76561198343533017",
                username: "StormPacer",
                images: {
                  avatar: "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "bl",
              },
              stats: {
                challengesCompleted: 4,
                rank: 1,
                qp: 0,
                value: 10,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561199108042297",
                username: "Raine'); DROP TABLE users;--",
                images: {
                  avatar:
                    "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "ss",
              },
              stats: {
                challengesCompleted: 2,
                rank: 2,
                qp: 0,
                value: 3,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561198086326146",
                username: "ACC | Hawk",
                images: {
                  avatar:
                    "https://cdn.discordapp.com/avatars/592779895084679188/493e15004a1ad6a059264c3d02aa75f5.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "ss",
              },
              stats: {
                challengesCompleted: 2,
                rank: 3,
                qp: 0,
                value: 3,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561198343533017",
                username: "StormPacer",
                images: {
                  avatar: "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "bl",
              },
              stats: {
                challengesCompleted: 4,
                rank: 1,
                qp: 0,
                value: 10,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561199108042297",
                username: "Raine'); DROP TABLE users;--",
                images: {
                  avatar:
                    "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "ss",
              },
              stats: {
                challengesCompleted: 2,
                rank: 2,
                qp: 0,
                value: 3,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561198086326146",
                username: "ACC | Hawk",
                images: {
                  avatar:
                    "https://cdn.discordapp.com/avatars/592779895084679188/493e15004a1ad6a059264c3d02aa75f5.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "ss",
              },
              stats: {
                challengesCompleted: 2,
                rank: 3,
                qp: 0,
                value: 3,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561198343533017",
                username: "StormPacer",
                images: {
                  avatar: "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "bl",
              },
              stats: {
                challengesCompleted: 4,
                rank: 1,
                qp: 0,
                value: 10,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561199108042297",
                username: "Raine'); DROP TABLE users;--",
                images: {
                  avatar:
                    "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "ss",
              },
              stats: {
                challengesCompleted: 2,
                rank: 2,
                qp: 0,
                value: 3,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561198086326146",
                username: "ACC | Hawk",
                images: {
                  avatar:
                    "https://cdn.discordapp.com/avatars/592779895084679188/493e15004a1ad6a059264c3d02aa75f5.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "ss",
              },
              stats: {
                challengesCompleted: 2,
                rank: 3,
                qp: 0,
                value: 3,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
            {
              userInfo: {
                id: "76561198343533017",
                username: "StormPacer",
                images: {
                  avatar: "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                  banner: null,
                  border: null,
                },
                preference: "bl",
              },
              stats: {
                challengesCompleted: 4,
                rank: 1,
                qp: 0,
                value: 10,
              },
              today: {
                diff: 0,
                completed: false,
              },
            },
          ],
        };
        } else if (page === 2) {
          leaderboard = {
            leaderboard: [
              {
                userInfo: {
                  id: "76561198343533017",
                  username: "StormPacer",
                  images: {
                    avatar: "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                    banner: null,
                    border: null,
                  },
                  preference: "bl",
                },
                stats: {
                  challengesCompleted: 4,
                  rank: 1,
                  qp: 0,
                  value: 10,
                },
                today: {
                  diff: 0,
                  completed: false,
                },
              },
              {
                userInfo: {
                  id: "76561199108042297",
                  username: "Raine'); DROP TABLE users;--",
                  images: {
                    avatar:
                      "https://cdn.discordapp.com/avatars/813176414692966432/0ce8808ab0435a25610ae7d045e9a03f.webp?size=1024",
                    banner: null,
                    border: null,
                  },
                  preference: "ss",
                },
                stats: {
                  challengesCompleted: 2,
                  rank: 2,
                  qp: 0,
                  value: 3,
                },
                today: {
                  diff: 0,
                  completed: false,
                },
              },
              {
                userInfo: {
                  id: "76561198086326146",
                  username: "ACC | Hawk",
                  images: {
                    avatar:
                      "https://cdn.discordapp.com/avatars/592779895084679188/493e15004a1ad6a059264c3d02aa75f5.webp?size=1024",
                    banner: null,
                    border: null,
                  },
                  preference: "ss",
                },
                stats: {
                  challengesCompleted: 2,
                  rank: 3,
                  qp: 0,
                  value: 3,
                },
                today: {
                  diff: 0,
                  completed: false,
                },
              },
            ],
          };
        } else {
          leaderboard = null;
        }
        if (leaderboard === null) {
          res.status(404).json({ error: { message: "Page not found" } });
        } else {
          res.status(200).json(leaderboard);
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
