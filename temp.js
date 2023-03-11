const sqlite = require("sqlite3");
const db = new sqlite.Database("main.db");

const extensions = [
  {
    name: "BabyDan Premier Gate Extension Large",
    width: 64,
    price: 64,
    id: 1,
    img: "./images/largeExtension.jpg",
    color: "white",
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 32,
    price: 32,
    id: 2,
    img: "./images/medExtension.jpg",
    color: "white",
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 7,
    price: 7,
    id: 3,
    img: "./images/smallExtension.jpg",
    color: "white",
  },
  {
    name: "BabyDan Premier Gate Extension Large",
    width: 64,
    price: 64,
    id: 1,
    img: "./images/largeExtension.jpg",
    color: "black",
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 32,
    price: 32,
    id: 2,
    img: "./images/medExtension.jpg",
    color: "black",
  },
  {
    name: "Babydan Premier Gate Extension Medium",
    width: 7,
    price: 7,
    id: 3,
    img: "./images/smallExtension.jpg",
    color: "black",
  },
];

db.run(/*SQL*/ `CREATE TABLE IF NOT EXISTS extensions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    width REAL,
    price REAL,
    img TEXT,
    color TEXT
  )`);

(async () => {
  for (const extension of extensions) {
    try {
      await new Promise(function (resolve, reject) {
        db.run(
          /*SQL*/ `INSERT INTO extensions(name, width, price, img, color) VALUES (?,?,?,?,?)`,
          [
            extension.name,
            extension.width,
            extension.price,
            extension.img,
            extension.color,
          ],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          }
        );
      });
    } catch (err) {
      console.log(err);
      continue;
    }
  }
})();
