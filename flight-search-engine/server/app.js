const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')

app.use(cors())

app.get("/", (req, res)=> {
    let rawdata = fs.readFileSync('assignment-data.json')
    let data = JSON.parse(rawdata)
    res.json(data);
})


app.listen(8000, ()=> {
    console.log("Server is running at port 3000");
    console.log("http://localhost:8000");
})