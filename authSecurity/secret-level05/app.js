require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// PASSPORT IDENTIFICATION

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "longString",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      req.login(user, function (err) {
        if (err) {
          console.log(err);
          res.redirect("/login");
        } else {
          res.redirect("/secrets");
        }
      });
    }
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      User.register(
        { username: req.body.username },
        req.body.password,
        function (err, user) {
          if (err) res.redirect("/register");
          else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/secrets");
            });
          }
        }
      );
    } else res.redirect("/register");
  });

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else res.redirect("/login");
});

app.listen(PORT, () => {
  console.log("server listen on port " + PORT);
});
