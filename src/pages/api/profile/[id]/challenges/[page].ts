import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query as unknown as { id: string };
      const { page } = req.query as unknown as { page: number };

      if (!id) {
        return res.status(400).json({ error: "Missing ID" });
      }

      await axios
        .get(`${process.env.API_URL}/challenge/history/${id}?page=${page}&limit=5`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            if (response.data !== null) {
              return res.status(200).json(response.data);
            }
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: "Something bad happened" });
        });

    } else {
      return res.status(400).json({ error: "Invalid request method" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something bad happened" });
  }
}
