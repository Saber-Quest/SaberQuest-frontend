interface UserInfo {
  id: string;
  username: string;
  images: {
    avatar: string | null;
    banner: string | null;
    border: string | null;
  };
  preference: string;
}

interface Stats {
  challengesCompleted: number;
  rank: number;
  qp: number;
  value: number;
}

interface Today {
  diff: number;
  completed: boolean;
}

interface LeaderboardEntry {
  userInfo: UserInfo;
  stats: Stats;
  today: Today;
}

export interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
}