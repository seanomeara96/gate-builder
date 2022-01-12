import gate from "./images/gate.webp";
import extension1 from "./images/largeExtension.jpg";
import extension2 from "./images/medExtension.jpg";
import extension3 from "./images/smallExtension.jpg";
export const components = [
  {
    type: "gate",
    name: "BabyDan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm)",
    width: 76,
    price: 76,
    id: 1,
    img: gate,
    isExtension: false,
    tolerance: 6,
  },
  {
    type: "extension",
    name: "BabyDan Premier Gate Extension 64.5cm",
    width: 64,
    price: 64,
    id: 2,
    img: extension1,
    isExtension: true,
    tolerance: 0,
  },
  {
    type: "extension",
    name: "Babydan Premier Gate Extension 32cm",
    width: 32,
    price: 32,
    id: 3,
    img: extension2,
    isExtension: true,
    tolerance: 0,
  },
  {
    type: "extension",
    name: "BabyDan Standard Extend-A-Gate Kit - White ( 7cm)",
    width: 7,
    price: 7,
    id: 4,
    img: extension3,
    isExtension: true,
    tolerance: 0,
  },
];
