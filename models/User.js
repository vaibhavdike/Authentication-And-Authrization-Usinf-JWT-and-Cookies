const mongoose = require("mongoose");
const { type } = require("os");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
})

module.exports =mongoose.model("User",userSchema);