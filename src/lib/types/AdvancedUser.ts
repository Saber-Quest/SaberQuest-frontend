import { ChallengeType, ChallengeDiff } from "@enums/Challenge";
import { UserInfo, Stats, Today } from "./";

export interface InventoryItem {
  id: string;
  image: string;
  name: string;
  amount: number;
}

export interface ChallengeItem {
  name: string;
  image: string;
  rarity: string;
}

interface Challenge {
  name: string;
  description: string;
  type: ChallengeType;
  difficulty: {
    name: ChallengeDiff;
    challenge: number[];
  };
  preference: string;
}

export interface ChallengeHistoryItem {
  date: string;
  items: ChallengeItem[];
  qp: number;
  challenge: Challenge;
}

export interface AdvancedUser {
  userInfo: UserInfo;
  stats: Stats;
  today: Today;
  inventory: InventoryItem[];
  challengeHistory: ChallengeHistoryItem[];
}
