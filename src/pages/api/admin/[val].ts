import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = process.env.USER_RATELIMIT || 10;
const limiter = rateLimit({
  interval: 60000,
  uniqueTokenPerInterval: 500,
});

export default async function getFullUserdata(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { val } = req.query;
  const lowerVal = val?.toString().toLowerCase();

  if (!val) {
    return res
      .status(400)
      .json({ error: { message: `Invalid search type, got ${val}` } });
  }

  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");

    await axios
      .get(`${process.env.API_URL}/search?q=${lowerVal}`)
      .then((response) => {
        response.data.forEach((user: any) => {
          user.username = user.username.toLowerCase();
        });

        return res.status(200).json({ list: response.data });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.response.data.error });
      });
  } catch (err: any) {
    res.status(500).json({ error: { message: err } });
  }
}
