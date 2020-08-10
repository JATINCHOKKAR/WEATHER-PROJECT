const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

});
app.post("/",function(req,res){
    
    console.log(req.body.cityname)
    const query=req.body.cityname;
    console.log(query)
const apikey="";
const units="imperial";
const url= ""+query+"&units="+units+"&appid="+apikey;

https.get(url,function(response){
    console.log(response.statusCode)
response.on("data",function(data){
        //console.log(data)
        weatherData=JSON.parse(data);
        //console.log(weatherData)
       
      // const  object={
        //   name:"jatin",
          // favouriteFood:"Nan with matar panner"
           
        //}
       // a=JSON.stringify(object)
        //console.log(a)
    const temp1= weatherData.main.temp;
    const temp=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    
    const imageurl="https://openweathermap.org/img/wn/"+icon +"@2x.png"
    res.write("<p>THE WEATHER DESCRIPTION IS </p> "+temp)
    
    res.write("<h1>TEMP  IS </h1> "+temp1)
    
    res.write("<img src="+imageurl+">")
    res.send()
})
})
}) 

app.listen(3000,function()
{
    console.log("server is running on port 3000");
})
