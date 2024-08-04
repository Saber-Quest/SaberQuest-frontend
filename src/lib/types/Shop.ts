export interface Item {
  id: string;
  name: string;
  image: string;
  rarity: string;
  price: number;
}

export interface ItemList {
  items: Item[];
  reset_time: number;
}
