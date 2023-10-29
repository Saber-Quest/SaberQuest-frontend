export interface ItemRecipes {
  item1_id: string;
  item1_name?: string;
  item1_image?: string;
  item1_rarity?: string;
  item2_id: string;
  item2_name?: string;
  item2_image?: string;
  item2_rarity?: string;
  crafted_id: string;
  crafted_name?: string;
  crafted_image?: string;
  crafted_rarity?: string;
  canCraft?: number;
}

export interface AllowedRecipes {
  item1: Item;
  item2: Item;
  crafted: Item;
  canCraft: number;
}

interface Item {
  id: string;
  name: string;
  image: string;
  rarity: string;
}
