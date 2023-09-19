interface UserInfo {
  id: string;
  username: string;
  images: {
    avatar: string;
    banner: string | null;
    border: string | null;
  };
  preference: string;
  patreon: string | null;
  autoComplete: string | null;
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

export interface User {
  userInfo: UserInfo;
  stats: Stats;
  today: Today;
}
