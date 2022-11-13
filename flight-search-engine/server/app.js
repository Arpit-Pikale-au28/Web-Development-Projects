const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const jsonFile = require('./assignment-data.json');
const { isTypedArray } = require('util/types')


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
    // let val = string.departureDate;
    // const myArray = val.split("-");
    // let year = myArray[0];
    // let month = myArray[1];
    // let day = myArray[2];
    // if(month.charAt(0) == "0"){
    //     month = month.charAt(1)
    // }
    // if(day.charAt(0) == '0'){
    //     day = day.charAt(1)
    // }
    // let formatteddate = day + "/" + month + "/" + year; 
    let arr = []
    jsonFile.results.map((item) => {
        if(item.originCity === originCity && item.destinationCity === destinationCity) {
            arr.push(item)
        }
    })
    if(arr.length == 0){
        res.send({err:"flight not found"})
    }
    else{
        res.send(arr)
    }
})
app.listen(8000, ()=> {
    console.log("Server is running at port 3000");
    console.log("http://localhost:8000");
})

