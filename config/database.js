const mongoose = require('mongoose');
require('dotenv').config();
const connect=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("connected with DB")})
    .catch((err)=>{console.log(err.message)})
    
}

module.exports=connect;