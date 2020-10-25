import gateImg from "./images/gate.webp";
import smallExtensionImg from "./images/smallExtension.jpg";
import medExtensionImg from "./images/medExtension.jpg";
import largeExtensionImg from "./images/largeExtension.jpg";
export const options = {
  tolerance: 6,
  gate: {
    name:
      "BabyDan Premier True Pressure Fit Safety Gate - White (73.5 - 79.6cm)",
    length: 76,
    price: 76,
    id: 1,
    img: gateImg,
    isExtension: false,
  },
  largeExtension: {
    name: "BabyDan Premier Gate Extension 64.5cm",
    length: 64,
    price: 64,
    id: 2,
    img: largeExtensionImg,
    isExtension: true,
  },
  medExtension: {
    name: "Babydan Premier Gate Extension 32cm",
    length: 32,
    price: 32,
    id: 3,
    img: medExtensionImg,
    isExtension: true,
  },
  smallExtension: {
    name: "BabyDan Standard Extend-A-Gate Kit - White ( 7cm)",
    length: 7,
    price: 7,
    id: 4,
    img: smallExtensionImg,
    isExtension: true,
  },
};
