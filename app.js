const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "a05da03180b69273bbd9183191d0a906";
    //const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&id=524901&appid=" + apiKey;
    https.get(url, function(response) {
        console.log(response.statusCode);
    
    if(response.statusCode == "404")
    {
        res.send("<h1>Invalid Input!!</h1>");
    }
    else
    {
    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + description + "</p>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degreee fahrenheit</h1>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
        });
     }
    });
})

app.listen(3000, function() {
    console.log("Server is running on port 3000."); 
})
