import { SessionUser } from "@lib/types";
import CryptoJS from "crypto-js";

const secret = process.env.AUTHSECRET || "devsecret";
const salt = process.env.SALT || "devsalt";

export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, secret + salt).toString();
}

export function decrypt(text: string) {
  const bytes = CryptoJS.AES.decrypt(text, secret + salt);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function createSession(id: string, jwt: string) {
  jwt = encrypt(jwt);
  const data: SessionUser = { id, jwt, created_at: new Date().toISOString() };
  const encryptedUser: string = encrypt(JSON.stringify(data));
  return [data, encryptedUser];
}

export function readSession(token: string) {
  const decryptedUser = decrypt(token);
  const data: SessionUser = JSON.parse(decryptedUser);
  return data;
}
