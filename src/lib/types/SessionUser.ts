export interface SessionUser {
  id?: string;
  jwt: string;
  created_at: string;
  user?: AdvancedUser;
}

import { AdvancedUser } from "./";
