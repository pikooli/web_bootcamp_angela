const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("./mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("vue engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//              Base Route

app
  .route("/articles")
  .get((req, res) => {
    mongoose.getAllArticles().then((data) => {
      if (data) res.send(data);
      else res.send("No data in the current database");
    });
  })
  .post((req, res) => {
    if (req.body.title && req.body.content)
      mongoose.createArticle(req.body.title, req.body.content).then((ret) => {
        if (ret) res.sendStatus(200);
        else res.sendStatus(500);
      });
    else res.sendStatus(400);
  })
  .delete((req, res) => {
    mongoose.deleteAllArticles().then((ret) => {
      if (ret.ok) res.sendStatus(200);
      else res.sendStatus(500);
    });
  });

//                    Individual Articles

app
  .route("/articles/:articleId")
  .get((req, res) => {
    if (req.params.articleId)
      mongoose.getArticle(req.params.articleId).then((data) => {
        res.send(data);
      });
  })
  .delete((req, res) => {
    if (req.params.articleId)
      mongoose.deleteArticle(req.params.articleId).then((ret) => {
        if (ret) res.sendStatus(200);
        else res.sendStatus(500);
      });
    else res.sendStatus(400);
  })
  .put((req, res) => {
    if (req.params.articleId)
      mongoose
        .updateArticle(req.params.articleId, req.body.content)
        .then((ret) => {
          if (ret) res.sendStatus(200);
          else res.sendStatus(500);
        });
    else res.sendStatus(400);
  })
  .patch((req, res) => {
    if (req.params.articleId)
      mongoose
        .updateArticle(req.params.articleId, req.body.content)
        .then((ret) => {
          if (ret) res.sendStatus(200);
          else res.sendStatus(500);
        });
    else res.sendStatus(400);
  });

//              Listening

app.listen(PORT, () => {
  console.log("server listen on port " + PORT);
});
