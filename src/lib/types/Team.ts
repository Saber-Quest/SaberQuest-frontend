export interface TeamMember {
  Name: string;
  Info: string;
  SQID: string;
  Discord: string;
  GitHub: string | null;
  Twitch: string | null;
  Twitter: string | null;
  YouTube: string | null;
}

export interface Team {
  [key: string]: TeamMember[];
}
