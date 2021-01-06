const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

const port = 3000;
const apiKey = "411bc5a72b76d06e4d0afba0b390dddc";

function getIconUrl(icon) {
  return `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
}

function getCityUrl(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city = req.body.city;
  https.get(getCityUrl(city), (response) => {
    if (response.statusCode === 200) {
      response.on("data", (d) => {
        const weater = JSON.parse(d);
        res.set("Content-Type", "text/html");
        res.write(
          `<h1>The weather is currently ${weater.weather[0].description}</h1>`
        );
        res.write(
          `<h1>The temperature in ${weater.name} is ${weater.main.temp} celcius</h1> `
        );
        res.write(getIconUrl(weater.weather[0].icon));
        res.send();
      });
    } else res.send("Not a correct city ");
  });
});

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
