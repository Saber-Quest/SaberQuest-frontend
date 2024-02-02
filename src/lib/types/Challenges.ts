interface Challenge {
  challenge: number[];
  color: string;
}

interface Difficulties {
  normal: Challenge;
  hard: Challenge;
  expert: Challenge;
}

export interface ChallengeData {
  name: string;
  description: string;
  type: string;
  difficulties: Difficulties;
  image: null | string;
  reset_time: number;
}

export interface Challenges {
  challenges: ChallengeData[];
}
