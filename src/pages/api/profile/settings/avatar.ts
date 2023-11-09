import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import sharp, { Metadata } from "sharp";
import isTransparent from "@lib/api/transparencyCheck";
import { decrypt } from "@lib/api/createSession";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = 5;
const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "PUT") {
        const {
          av,
          t,
        }: {
          av: string;
          t: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!av) {
          return res.status(400).json({ error: "Missing a valid avatar" });
        }
        if (!av.startsWith("data:image")) {
          return res.status(400).json({ error: "Invalid avatar image-data" });
        }

        const deToken = decrypt(t);
        let img: Metadata;
        try {
          img = await sharp(
            Buffer.from(
              av.replace(/^data:image\/(png|jpeg);base64,/, ""),
              "base64"
            )
          ).metadata();
        } catch (error) {
          return res.status(400).json({
            error:
              "Sharp could not read avatar data.\nTry a new image or contact a developer.",
          });
        }

        if (img.format !== "png" && img.format !== "jpeg") {
          return res.status(400).json({
            error: "Invalid avatar file-format.\n\nPlease use PNG or JPG/JPEG",
          });
        }

        if (img.width !== 512 || img.height !== 512) {
          return res.status(400).json({ 
              error:
                "Invalid avatar dimension-size.\n\nAccepted dimensions: 512x512px"
            });
        }

        const image = Buffer.from(av.replace(/^data:image\/(png|jpeg);base64,/, ""),"base64");

        if (await isTransparent(image)) {
          return res.status(400).json({
            error: "Images under 65% transparency are not allowed.",
          });
        }

        await axios
          .put(`${process.env.API_URL}/update/avatar`, {
            avatar: av.replace(/^data:image\/(png|jpeg);base64,/, ""),
            token: deToken,
          })
          .then(() => {
            return res.status(200).json({ message: "Avatar updated!" });
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
