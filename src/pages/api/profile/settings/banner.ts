import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sharp, { Metadata } from "sharp";
import isTransparent from "@lib/api/transparencyCheck";
import { decrypt } from "@lib/api/createSession";
import rateLimit from "@lib/api/ratelimit";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const ratelimit: any = 10;
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
      if (req.method === "PUT") {
        const {
          ba,
          type,
          t,
        }: {
          ba: string;
          type: string;
          t: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!ba) {
          return res.status(400).json({ error: "Missing a valid banner" });
        }
        if (type !== "hor" && type !== "ver") {
          return res.status(400).json({ error: "Invalid direction-type" });
        }
        if (!ba.startsWith("data:image")) {
          return res.status(400).json({ error: "Invalid banner image-data" });
        }
        const deToken = decrypt(t);

        let img: Metadata;
        try {
          img = await sharp(
            Buffer.from(
              ba.replace(/^data:image\/(png|jpeg);base64,/, ""),
              "base64",
            ),
          ).metadata();
        } catch (error) {
          return res.status(400).json({
            error:
              "Sharp could not read banner data.\nTry a new image or contact a developer.",
          });
        }

        if (img && img.size && img.size > 10000000) {
          return res.status(400).json({
            error:
              "Banner file-size is **too large**.\n\nPlease use an image under **10MB**",
          });
        }

        if (img.format !== "png" && img.format !== "jpeg") {
          return res.status(400).json({
            error:
              "Invalid banner file-format.\n\nPlease use **PNG** or **JPG/JPEG**",
          });
        }

        if (type === "hor") {
          if (img.width !== 800 || img.height !== 150) {
            return res.status(400).json({
              error:
                "Invalid banner dimension-size.\n\nAccepted dimension: **800**x**150**px",
            });
          }
        } else if (type === "ver") {
          if (img.width !== 425 || img.height !== 820) {
            return res.status(400).json({
              error:
                "Invalid banner dimension-size.\n\nAccepted dimension: **425**x**820**px",
            });
          }
        }

        const image = Buffer.from(
          ba.replace(/^data:image\/(png|jpeg);base64,/, ""),
          "base64",
        );

        if (await isTransparent(image)) {
          return res.status(400).json({
            error: "Images under **65%** transparency are not allowed.",
          });
        }

        await axios
          .put(`${process.env.API_URL}/update/banner`, {
            banner: ba.replace(/^data:image\/(png|jpeg);base64,/, ""),
            type: type,
            token: deToken,
          })
          .then(() => {
            return res.status(200).json({ message: "Banner updated!" });
          })
          .catch((error) => {
            return res.status(400).json({ error: "Some error here" });
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
