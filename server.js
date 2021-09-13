require('dotenv').config()

const express = require('express')
const app = express() 

const mongoose = require('mongoose')
const cors=require('cors')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true })

const db = mongoose.connection
db.on("error", (error)=> console.log(error))
db.on("open", ()=> console.log("Connected to Database!"))

app.use(express.json())
app.use(cors())
app.use(express.static('my-project'));// this is used for public static pages of ui
//CORS Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

const employeesRouter  = require('./routes/employees')

app.use('/employees', employeesRouter)


app.listen(3690, ()=> console.log("Server Started!"))

