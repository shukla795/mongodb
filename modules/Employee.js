const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name:{
        type:String
    },
    desigation:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    },avatar:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Employee',employeeSchema)