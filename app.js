const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const name = req.body.city;
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=801897ac61b586b904b829979efdc700&units=metric";

  https.get(weatherUrl, function (response) {
    // NOt possible to change data in url
    response.on("data", function (source) {
      const weatherData = JSON.parse(source);
      const icon = weatherData.weather[0].icon;
      const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The weather is currently " +
          weatherData.weather[0].description +
          " </h1>"
      );
      res.write(
        "<h1>The temp in " +
          req.body.city +
          " is " +
          weatherData.main.temp +
          " degree </h1>"
      );

      res.write("<img src =" + url + ">");
      res.end();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
