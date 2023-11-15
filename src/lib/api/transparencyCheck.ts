import sharp from "sharp";

export default async function isTransparent(image: Buffer) {
  const img = await sharp(image);
  const alphaChannel = await img.stats();
  if (!alphaChannel.channels[3]) return false;
  const alphaSum = await alphaChannel.channels[3].sum;
  return alphaSum < 19920000;
}
