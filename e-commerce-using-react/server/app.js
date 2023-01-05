const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient} = require("mongodb")
require("dotenv").config()
const bcrypt = require('bcrypt');

// setUp mongodb server connection
const url =  process.env.MONGO_URL
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
    let oldUser = null
    try {
        oldUser = await collection.find({email:email}).toArray()
       }
    catch(err) {
         res.send({status: "Something goes wrong try again!!"})
    }
    if (oldUser.length != 0 && oldUser[0].email === email){
          return res.send({status:"User Already Exists"})
    }
    else {
            await collection.insertOne({name, email, mobile, password: encryptPassword})
            res.send({status:"User sucessfully registered"})
        }
})
    

app.post('/login', async(req,res)=> {
    const {email, password} = await req.body
    let findUser = null
    console.log(req.body);
    try {
        findUser = await collection.find({email:email}).toArray()
    }
    catch(err){
        //console.log(err)
        return res.send({status:"User not registered"})
    }
    if (findUser.length != null){
        let mongoEmail = await findUser[0].email
        let mongoPassword = await findUser[0].password
        const passwordMatch = await bcrypt.compare(password, mongoPassword)
        console.log(passwordMatch)
    if(email === mongoEmail && passwordMatch === true){
       // console.log("login credentials are correct");  
        res.send({status:"login credentials are correct"})
    }
    else{
       // console.log("inccorrect username/password");
        res.send({status:"inccorrect username/password"})
    }
    }
    
})

app.listen(5000, ()=> {
    console.log('server is started at port 5000')
})