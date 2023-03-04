import gate from "./images/gate.webp";
import extension1 from "./images/largeExtension.jpg";
import extension2 from "./images/medExtension.jpg";
import extension3 from "./images/smallExtension.jpg";
export const gates = [
  {
    name: "BabyDan Premier True Pressure Fit Safety Gate (73.5 - 79.6cm)",
    width: 76,
    price: 76,
    id: 1,
    img: gate,
    isExtension: false,
    tolerance: 6,
    color: "white",
  },
  {
    name: "BabyDan Premier True Pressure Fit Safety Gate (73.5 - 79.6cm)",
    width: 76,
    price: 76,
    id: 2,
    img: gate,
    isExtension: false,
    tolerance: 6,
    color: "black",
  },
];
export const extensions = [
  {
    name: "BabyDan Premier Gate Extension Large",
    width: 64,
    price: 64,
    id: 1,
    img: extension1,
    color: "white",
    compatible_with: [1],
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 32,
    price: 32,
    id: 2,
    img: extension2,
    color: "white",
    compatible_with: [1],
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 7,
    price: 7,
    id: 3,
    img: extension3,
    color: "white",
    compatible_with: [1],
  },
  {
    name: "BabyDan Premier Gate Extension Large",
    width: 64,
    price: 64,
    id: 1,
    img: extension1,
    color: "black",
    compatible_with: [2],
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 32,
    price: 32,
    id: 2,
    img: extension2,
    color: "black",
    compatible_with: [2],
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 7,
    price: 7,
    id: 3,
    img: extension3,
    color: "black",
    compatible_with: [2],
  },
];
