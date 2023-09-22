import CryptoJS from "crypto-js";
import * as https from "https";

const secret = process.env.AUTHSECRET || "devsecret";
const salt = process.env.SALT || "devsalt";

interface User {
  id: string;
  jwt: string;
  created_at: string;
}

export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, secret + salt).toString();
}

export function decrypt(text: string) {
  const bytes = CryptoJS.AES.decrypt(text, secret + salt);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function createSession(id: string, jwt: string) {
  const data: User = { id, jwt, created_at: new Date().toISOString() };
  const encryptedUser = encrypt(JSON.stringify(data));
  return [data, encryptedUser];
}
