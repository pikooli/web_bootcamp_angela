const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("salut");
});

app.listen(3000, function () {
  console.log("server is listen on port 3000");
});
