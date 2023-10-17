import { UserInfo, Stats, Today } from "./";

interface LeaderboardEntry {
  userInfo: UserInfo;
  stats: Stats;
  today: Today;
}

export interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
}