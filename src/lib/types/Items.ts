export type ItemInfo = {
  image: string;
  name: string;
};

export type ItemMapping = {
  [id: string]: ItemInfo;
};

export const itemMapping: ItemMapping = {
  "115": {
    image: "/assets/images/icons/115.png",
    name: "115",
  },
  ap: {
    image: "/assets/images/icons/arrow_pieces_icon.png",
    name: "Arrow Pieces",
  },
  bcn: {
    image: "/assets/images/icons/badcut_notes_icon.png",
    name: "Bad Cut Notes",
  },
  bp: {
    image: "/assets/images/icons/blue_cube_pieces_icon.png",
    name: "Blue Note Pieces",
  },
  bd: {
    image: "/assets/images/icons/blue_debris_icon.png",
    name: "Blue Debris",
  },
  bn: {
    image: "/assets/images/icons/blue_notes_icon.png",
    name: "Blue Notes",
  },
  bpp: {
    image: "/assets/images/icons/blue_poodle_icon.png",
    name: "Blue Poodle",
  },
  bs: {
    image: "/assets/images/icons/blue_saber_icon.png",
    name: "Blue Saber",
  },
  bsl: {
    image: "/assets/images/icons/blue_slider_icon.png",
    name: "Blue Slider",
  },
  bst: {
    image: "/assets/images/icons/blue_stack.png",
    name: "Blue Stack",
  },
  bto: {
    image: "/assets/images/icons/blue_tower.png",
    name: "Blue Tower",
  },
  br: {
    image: "/assets/images/icons/bomb_reset_icon.png",
    name: "Bomb Reset",
  },
  b: {
    image: "/assets/images/icons/bombs_icon.png",
    name: "Bombs",
  },
  bt: {
    image: "/assets/images/icons/bsmg_token.png",
    name: "BSMG Token",
  },
  cw: {
    image: "/assets/images/icons/crouch_wall_icon.png",
    name: "Crouch Wall",
  },
  ct: {
    image: "/assets/images/icons/cube_community_token.png",
    name: "CC Token",
  },
  dn: {
    image: "/assets/images/icons/double_notes_icon.png",
    name: "Double Notes",
  },
  gn: {
    image: "/assets/images/icons/golden_note_icon.png",
    name: "Golden Note",
  },
  gp: {
    image: "/assets/images/icons/golden_pieces_icon.png",
    name: "Golden Pieces",
  },
  ht: {
    image: "/assets/images/icons/hitbloq_token.png",
    name: "Hitbloq Token",
  },
  rcp: {
    image: "/assets/images/icons/red_cube_pieces_icon.png",
    name: "Red Note Pieces",
  },
  rd: {
    image: "/assets/images/icons/red_debris_icon.png",
    name: "Red Debris",
  },
  rn: {
    image: "/assets/images/icons/red_notes_icon.png",
    name: "Red Notes",
  },
  rpp: {
    image: "/assets/images/icons/red_poodle_icon.png",
    name: "Red Poodle",
  },
  rs: {
    image: "/assets/images/icons/red_saber_icon.png",
    name: "Red Saber",
  },
  rsl: {
    image: "/assets/images/icons/red_slider_icon.png",
    name: "Red Slider",
  },
  rst: {
    image: "/assets/images/icons/red_stack.png",
    name: "Red Stack",
  },
  rto: {
    image: "/assets/images/icons/red_tower.png",
    name: "Red Tower",
  },
  st: {
    image: "/assets/images/icons/scoresaber_token.png",
    name: "ScoreSaber Token",
  },
  sn: {
    image: "/assets/images/icons/silver_note_icon.png",
    name: "Silver Note",
  },
  sp: {
    image: "/assets/images/icons/silver_pieces_icon.png",
    name: "Silver Pieces",
  },
  w: {
    image: "/assets/images/icons/wall_icon.png",
    name: "Wall",
  },
};

export function convertId(id: any): ItemInfo | any {
  return itemMapping[id];
}
