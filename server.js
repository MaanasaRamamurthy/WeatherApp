const express= require("express")
// https is a native module used to make GET request to external server
const https= require("https")
// bodyParser is used to get the data from the website to the server 
const bodyParser = require("body-parser")

const app= express()

app.set("view engine","ejs")

// this is used to give respond to the user when he is in homepage that is "/"
app.get("/",function(req,res){
    // will get the data that is the CITYNAME form the use
    app.use(bodyParser.urlencoded({extended:true}))

    // setting the public folder to use css page using express
    app.use(express.static("public"));

    // will render the ejs page
    res.render("index",{cityName:"CITY",temp:"Temp",description:""})

    // will send the html file
    // res.sendFile(__dirname + "/index.html")

    // used to post the data to the server that is the CITYNAME
    app.post("/",function(req,res){
        // console.log(req.body.city_name)
        // stores the values in the variables    
        var CITYNAME = req.body.city_name
        const units = "metric"
        const api = "e4b23ad3f51a6781dfc8450905b67627"
        const url="https://api.openweathermap.org/data/2.5/weather?units="+units+"&q="+CITYNAME+"&APPID="+api
    

        // https is used to send GET request to external server and respond with its data
        https.get(url,function(response){

            // to print the response in terminal uncomment below code
            console.log(response.statusCode)
            
            // to get the main data from api we use response.on in data
            if(response.statusCode===200){
                response.on("data",function(data){
                    // the data will be get printed in hexadecimal(JSON) which will not be easy to undertsand
                    // console.log(data)
                    // to convert the data in javascript we parse it
                    const Data=JSON.parse(data)
                    // now we got data...we specify the values in the data which we need
                    // we  store it in variables
                    const CITYNAME = req.body.city_name
                    var TEMP=Data.main.temp
                    const DESCRIPTION=Data.weather[0].description
                    const imageCode=Data.weather[0].icon
                    const IMAGEURL="http://openweathermap.org/img/wn/"+imageCode +"@2x.png"
                    // console.log(TEMP)
                    // console.log(description)
                    // we display it using res.write
                    // res.write("<h1>the TEMPerature in "+CITYNAME +" is " + TEMP +" degree celcius</h1>")
                    // res.write("<p>the weather above is "+ description +" </p>")
                    // res.write("<img src=" + imageURL+">")
                    // res.send()
                    res.render("index",{cityName:CITYNAME,temp:TEMP,description:DESCRIPTION,imageURL:IMAGEURL})
                    // res.sendFile(__dirname + "/output.html")
                })
            }else{
                    res.render("index",{cityName:"CITY",temp:"Temp",description:""})
            }
            
            

    })

})
    

    // res.send("Its working")
})




app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000")
})