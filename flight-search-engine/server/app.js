const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const jsonFile = require('./assignment-data.json');


app.use(cors())
app.use(express.json())

app.get("/", (req, res)=> {
    let rawdata = fs.readFileSync('assignment-data.json')
    let data = JSON.parse(rawdata)
    res.json(data);
})

app.post("/postData", (req, res) => {
    let string = req.body;
    let originCity = string.originCity.charAt(0).toUpperCase() + string.originCity.slice(1);
    let destinationCity = string.destinationCity.charAt(0).toUpperCase() + string.destinationCity.slice(1);
    let departureDate = string.departureDate
    departureDate = departureDate.replace(/\-/g, '/')
    jsonFile.map((item) => {
        if(item.originCity === originCity && item.destinationCity === destinationCity){
            console.log(item);
        }
        else{
            console.log("flight not found");
        }
    })
})

app.listen(8000, ()=> {
    console.log("Server is running at port 3000");
    console.log("http://localhost:8000");
})