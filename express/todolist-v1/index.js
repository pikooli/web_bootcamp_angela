const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let today = new Date();
let options = {
  day: "2-digit",
  weekday: "long",
  month: "long",
  year: "numeric",
};
let items = [];

let day = today.toLocaleDateString("en-US", options);

app.get("/", (req, res) => {
  res.render("list", { kindOfDay: day, items: items });
});

app.post("/", (req, res) => {
  if (req.body.newItem) items.push(req.body.newItem);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("server listen on port" + PORT);
});
