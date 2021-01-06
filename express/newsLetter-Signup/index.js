const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

const port = process.env.PORT || 3000;
const mailChimpApiKey = "26b87486a24e35b0941a59712f22c74b-us7";
const audienceId = "66888b492c";
const dc = "us7";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}`;
  const options = {
    method: "POST",
    auth: `toto:${mailChimpApiKey}`,
  };

  const request = https.request(url, options, (resp) => {
    if (resp.statusCode === 200) res.sendFile(__dirname + "/success.html");
    else res.sendFile(__dirname + "/failure.html");
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`server listen to port${port}`);
});
