interface UserInfo {
  id: string;
  username: string;
  images: {
    avatar: string;
    banner: string;
    border: string | null;
  };
  preference: string;
  patreon: boolean;
  autoComplete: boolean;
}

interface Stats {
  challengesCompleted: number;
  rank: number;
  qp: number;
  value: number;
}

interface InventoryItem {
  id: string;
  image: string;
  name: string;
  amount: number;
}

interface ChallengeItem {
  name: string;
  image: string;
  rarity: string;
}

interface Challenge {
  name: string;
  description: string;
  type: string;
  difficulty: {
    name: string;
    challenge: number[];
  };
}

interface ChallengeHistoryItem {
  date: string;
  items: ChallengeItem[];
  qp: number;
  challenge: Challenge;
}

export interface UserData {
  userInfo: UserInfo;
  stats: Stats;
  today: {
    diff: number;
    completed: boolean;
  };
  inventory: InventoryItem[];
  challengeHistory: ChallengeHistoryItem[];
}
