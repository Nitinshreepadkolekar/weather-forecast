const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
      res.sendFile(__dirname+"/index.html");
    });

app.post("/",function(req,res){
  const query = req.body.country;
  const standuard = req.body.standuard;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+standuard+"&appid=df9314e475a5dee3ed66116c7275bfe9";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temperature = weatherData.main.temp;
      const status = weatherData.weather[0].description;
      const image = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/"+image+"@2x.png";
      res.write("<h1>The temperature is "+temperature+" Degree Celcius</h>");
      res.write("<h1> The weather is currently "+ status + " </h1>");
      res.write("<img src="+imgUrl+">");
    });
  });
});


app.listen(3000,function(){
  console.log("your server is hosted in 3000");
})
