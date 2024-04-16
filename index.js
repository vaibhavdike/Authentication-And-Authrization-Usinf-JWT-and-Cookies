const express =require('express');
const app=express();
const authRoutes = require('./routes/authRoute');
require('dotenv').config();
const connect =require("./config/database");

const PORT= process.env.PORT || 8000 ;

// middleware 

app.use(express.json());
// mount the routes 

app.use("/api/v1",authRoutes);

//connecting to the database
connect();


//server started on port number 4000
app.listen(PORT,()=>{
    console.log(`Server is listen on port ${PORT}`);
})