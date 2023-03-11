const sqlite = require("sqlite3");
const db = new sqlite.Database("main.db");
const fs = require("fs");
db.all("select * from gates", function (err, rows) {
  if (err) return console.log(err);
  fs.writeFile(
    "./src/data/gates.json",
    JSON.stringify(rows),
    {
      encoding: "utf-8",
    },
    function (err) {
      if (err) return console.log(err);
      console.log("done gates");

      db.all("select * from extensions", function (err, rows) {
        if (err) return console.log(err);
        fs.writeFile(
          "./src/data/extensions.json",
          JSON.stringify(rows),
          {
            encoding: "utf-8",
          },
          function (err) {
            if (err) return console.log(err);
            console.log("done extensions");

            db.all("select * from compatibles", function (err, rows) {
              if (err) return console.log(err);
              fs.writeFile(
                "./src/data/compatibles.json",
                JSON.stringify(rows),
                {
                  encoding: "utf-8",
                },
                function (err) {
                  if (err) return console.log(err);
                  console.log("done compatibles");
                }
              );
            });
          }
        );
      });
    }
  );
});
