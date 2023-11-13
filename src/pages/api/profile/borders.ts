import { NextApiRequest, NextApiResponse } from "next";
import { borders } from "@lib/data/borders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    return res.status(200).json(borders);
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}
