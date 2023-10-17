export interface SessionUser {
  id?: string;
  jwt: string;
  created_at: string;
  user?: User;
}

import { User } from "./";
