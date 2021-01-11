const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const _ = require("lodash");
const post = require("./mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/post", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  post.getAllPost().then((posts) => {
    res.render("home", { postsArray: posts });
  });
});

app.get("/post/:id", (req, res) => {
  post
    .getPost(_.capitalize(_.toLower(req.params.id.toLowerCase())))
    .then((data) => {
      if (data) res.render("post", { article: data });
      else res.render("404");
    });
});

app.get("/:part", (req, res) => {
  if (fs.existsSync(__dirname + `/views/${req.params.part}.ejs`))
    res.render(req.params.part);
  else res.render("404");
});

app.post("/compose", (req, res) => {
  let data = {
    title: _.capitalize(req.body.title),
    post: _.capitalize(req.body.post),
  };
  post.addPost(data).then(() => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log("server listen on port " + PORT);
});
