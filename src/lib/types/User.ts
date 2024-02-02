export interface UserInfo {
  id: string;
  username: string;
  about: string;
  images: {
    avatar: string;
    banner: boolean;
    border: string | null;
  };
  preference: string;
  patreon: boolean;
  autoComplete: boolean;
  admin: boolean;
  banned: boolean;
}

export interface Stats {
  challengesCompleted: number;
  rank: number;
  qp: number;
  value: number;
}

export interface Today {
  diff: number;
  completed: boolean;
}

export interface User {
  userInfo: UserInfo;
  stats: Stats;
  today: Today;
}
