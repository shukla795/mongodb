const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const bodyparser = require("body-parser");

const EmployeeRoute = require('./routes/Employeroute')
const authRouter = require('./routes/AuthRoute')
mongoose.connect('mongodb://127.0.0.1:27017/testdb',{useNewUrlParser:true , useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database Connection Established')
})

const app = express()

app.use(morgan("dev"))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use('/uploads',express.static('uploads'))


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is backend port ${PORT}`)
})


app.use('/api/employee',EmployeeRoute)
app.use('/api/user',authRouter)