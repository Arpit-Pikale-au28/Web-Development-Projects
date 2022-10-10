const express = require('express');
const {MongoClient} = require('mongodb')
const path = require('path')
const {engine} = require('express-handlebars')

const app = express()
const url = 'mongodb+srv://arpitpikale:Arpit%40123@cluster0.p7qqt.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
var collection = null


const initilizeMongo = async() => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('UserData');
    collection = db.collection('userRegistration');
}
initilizeMongo()

//Middleware
app.use(express.static(path.join(__dirname, "../views")))
app.use(express.urlencoded({extended:true}))

// set view engine using handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "../views"));


app.get('/', (req, res) => {
    res.render('form')
})

// for signup
app.post('/addUser', async (req, res)=> {
    const insertUser = await collection.insertOne(req.body)
    res.render('form', {addUser : 'User Registered Successfully'})
})


// for login 
app.post('/successLogin', async(req, res)=> {
    const {email, password} =  await req.body
   
    try {
        const findUser = await collection.find({email: email}).toArray();
        const mongoemail =  await findUser[0].email 
        const mongopassword = await findUser[0].password
        if (email === mongoemail && password === mongopassword) {
            data = {
                fname: findUser[0].First_name,
                name: findUser[0].First_name + "  " + findUser[0].Last_name,
                email: mongoemail
            }
            res.render('dashboard', data)
        }
        else{
            res.render('form', {errorMessage: 'Invalid Username/Password'})
        }
    }
    catch (err){
        res.render('form', {errorMessage: 'Invalid Username/Password'})
    }
    
    
    
})

app.listen(8000, ()=> {
    console.log("server is started at port 8000");
    console.log("http://localhost:8000");
})
