export interface User {
  userInfo: {
    id: string;
    username: string;
    images: {
      avatar: string;
      banner: string;
      border: string;
    };
    preference: string;
  };
  chistory: number[];
  items: {
    id: string;
    image: string;
    name: string;
    amount: number;
  }[];
  stats: {
    challengesCompleted: number;
    rank: number;
    qp: number;
    value: number;
  };
  today: {
    diff: number;
    completed: boolean;
  };
}
