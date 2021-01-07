const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const _ = require("lodash");
const app = express();

const PORT = 3000;
const postsArray = [];
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/post", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { postsArray: postsArray });
});

app.get("/post/:id", (req, res) => {
  postsArray.forEach((e) => {
    if (_.toLower(e.title) === _.toLower(req.params.id.toLowerCase()))
      res.render("post", { article: e });
  });
  res.render("404");
});

app.get("/:part", (req, res) => {
  if (fs.existsSync(__dirname + `/views/${req.params.part}.ejs`))
    res.render(req.params.part);
  else res.render("404");
});

app.post("/compose", (req, res) => {
  let data = {
    id: postsArray.length,
    title: req.body.title,
    post: req.body.post,
  };
  postsArray.push(data);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("server listen on port " + PORT);
});
