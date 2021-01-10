const express = require("express");
const bodyParser = require("body-parser");
const mongooseUtils = require("./mongoose");
const _ = require("lodash");

const app = express();

const PORT = process.env.PORT | 3000;

function giveTodayDate() {
  let today = new Date();
  let options = {
    day: "2-digit",
    weekday: "long",
    month: "long",
    year: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let day = giveTodayDate();

app.get("/", (req, res) => {
  mongooseUtils
    .getAllTodoFromList("")
    .then((items) => {
      if (items) res.render("list", { kindOfDay: day, items: items, path: "" });
      else res.render("list", { kindOfDay: day, items: [], path: "" });
    })
    .catch((err) => {
      res.render("list", { kindOfDay: day, items: [], path: "" });
    });
});

app.get("/:path", (req, res) => {
  const path = _.capitalize(req.params.path);
  mongooseUtils
    .getAllTodoFromList(path)
    .then((items) => {
      if (items)
        res.render("list", {
          kindOfDay: day,
          items: items,
          path: path,
        });
      else res.redirect(`/${path}`);
    })
    .catch((err) => {
      res.render("list", { kindOfDay: day, items: [] });
    });
});

app.post("/", (req, res) => {
  if (req.body.newItem)
    mongooseUtils.addToList(req.body.newItem, req.body.button).then(() => {
      res.redirect(`/${req.body.button}`);
    });
  else res.sendStatus(500);
});

app.post("/checked", (req, res) => {
  if (req.body.id)
    mongooseUtils.changeCheckState(req.body.id, req.body.path).then(() => {
      res.sendStatus(200);
    });
  else res.sendStatus(500);
});

app.put("/delete", (req, res) => {
  if (req.body.id)
    mongooseUtils
      .deleteTodoFromList(req.body.id, req.body.path)
      .then(() => res.sendStatus(200));
  else res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log("server listen on port" + PORT);
});
