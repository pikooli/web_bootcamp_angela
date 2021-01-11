const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

let secret = process.env.SECRET || "thisisoursecret";

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

let User = mongoose.model("user", userSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      User.findOne({
        email: req.body.username,
      }).then((data) => {
        if (data.password === req.body.password) res.render("secrets");
        else res.redirect("/login");
      });
    }
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    console.log(req.body);
    if (req.body.username && req.body.password) {
      let user = new User({
        email: req.body.username,
        password: req.body.password,
      });
      user.save().then(() => res.render("secrets"));
    } else res.redirect("/register");
  });

app.listen(PORT, () => {
  console.log("server listen on port " + PORT);
});
