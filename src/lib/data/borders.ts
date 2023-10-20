import { Border } from "@lib/types";
export const borders: Border[] = [
  {
    id: 0,
    name: "None",
    imageUrl: null,
    patreon: false,
    type: "",
    hasGlitchEffect: false,
  },
  //APNGs
  {
    id: 1,
    name: "City",
    imageUrl: "apng/city.apng",
    patreon: true,
    type: "apng",
    hasGlitchEffect: false,
  },
  {
    id: 2,
    name: "Leaves",
    imageUrl: "apng/leaves.apng",
    patreon: true,
    type: "apng",
    hasGlitchEffect: false,
  },
  {
    id: 3,
    name: "Moss",
    imageUrl: "apng/moss.apng",
    patreon: true,
    type: "apng",
    hasGlitchEffect: false,
  },
  {
    id: 4,
    name: "Rainbow",
    imageUrl: "apng/rainbow.apng",
    patreon: true,
    type: "apng",
    hasGlitchEffect: false,
  },
  // GIFs
  {
    id: 5,
    name: "Glitched",
    imageUrl: "gif/glitch_border.gif",
    patreon: true,
    type: "gif",
    hasGlitchEffect: true,
  },
  {
    id: 6,
    name: "Neon",
    imageUrl: "gif/neon.gif",
    patreon: true,
    type: "gif",
    hasGlitchEffect: false,
  },
  {
    id: 7,
    name: "Particles",
    imageUrl: "gif/particles.gif",
    patreon: true,
    type: "gif",
    hasGlitchEffect: false,
  },
  {
    id: 8,
    name: "Gentleman",
    imageUrl: "png/gentleman.png",
    patreon: true,
    type: "png",
    hasGlitchEffect: false,
  },
  {
    id: 9,
    name: "The Sun, The Moon, The Stars",
    imageUrl: "png/sun_moon_star.png",
    patreon: true,
    type: "png",
    hasGlitchEffect: false,
  },
];
