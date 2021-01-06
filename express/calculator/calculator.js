const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  res.send(
    `The result is ${parseInt(req.body.num1) + parseInt(req.body.num2)}`
  );
});

app.get("/bmicalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
  res.send(
    `The BMI is ${
      Number(req.body.weight) / Math.pow(Number(req.body.height), 2)
    }`
  );
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});

/*
	route : 
	localhost:3000
	localhost:3000/bmicalculator

*/
