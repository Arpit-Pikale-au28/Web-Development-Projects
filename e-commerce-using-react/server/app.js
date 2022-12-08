const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient} = require("mongodb")
require("dotenv").config()
const bcrypt = require('bcrypt');

// setUp mongodb server connection
const url = process.env.MONGO_URL
const client = new MongoClient(url)
var collection = null

const initilizeMongo = async()=> {
   await client.connect()
   console.log("connected successfully to server");
   const db = client.db('e-commerce')
   collection = db.collection('register_user')
} 
 
initilizeMongo()

app.use(cors())
app.use(express.json())

app.post('/register', async(req, res) => {
    const {name, email, mobile,password, cpassword} = await req.body
    let encryptPassword =  await bcrypt.hash(password, 10)
    try {
        let oldUser = await collection.find({email:email}).toArray()
        if(oldUser[0].email === email){
        return res.send({err:"user already Exists"})
        }
    
        await collection.insertOne({name, email, mobile, password: encryptPassword})
        res.send({status:"ok"})
    }
    catch(err) {
         res.send({status: "error"})
    }
    
})

app.post('/login', async(req,res)=> {
    const {email, password} = await req.body
    console.log(req.body);
    let findUser = await collection.find({email: email}).toArray()
    let mongoEmail = await findUser[0].email
    let mongoPassword = await findUser[0].password
    if(email === mongoEmail && password === mongoPassword){
        console.log("login credentials are correct");
        res.send(findUser)
    }
    else{
        console.log("inccorrect username/password");
    }
})

app.listen(5000, ()=> {
    console.log('server is started at port 5000')
})