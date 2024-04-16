const User =require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { options } = require("../routes/authRoute");
require("dotenv").config();
exports.signup = async(req,res) =>{

    //destructuring
      const {name,email,password,role} =req.body;


      try{
      const existingUser =await User.findOne({email});

      if(existingUser){
     res.status(400).json({
        success:false,
        message:"These email already register",
     })
            process.exit(1);
      }


      
      try{
        const hashPassword = await bcrypt.hash(password,10);
        //save it in DB
        const user = await User.create({name,email,password:hashPassword,role});

     res.status(200).json({
        success:true,
        data:user,
        message:"user save successfully"
     })
      }catch(err){
         console.log(err.message);
         res.status(500).json(
            {
                success:false,
                message:"Error in encrypt the password",
            }
         )
      }



      }catch(err){

        console.log(err.message);
        res.status(500).json(
           {
               success:false,
               message:"internal server error",
           }
        )
      }

}




//for login


exports.login = async(req,res)=>{
   //extracting name and pass from req body
    const {email,password} =req.body;

      try{
      if(!email || !password){
         return res.status(400).json(
            {
               success:false,
               message:"Please fill all required field",
            }
         )
      }

      let user = await User.findOne({email});

      if(!user){
         return res.status(404).json({
            success:false,
            message:"User not registered",
         })
      }

      const payload={
         id:user._id,
         email:user.email,
         role:user.role,
       }
       
      if(await bcrypt.compare(password,user.password)){
       
         //creting jwt token
         const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
         user= await user.toObject();
         user.token=token;
         user.password=undefined;
        
         res.cookie("token",token,{
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
         }).status(200).json(
            {
               success:true,
               token,user,
               message:"User logedIn successfully",
            }
         )

      }else{
               return res.status(404).json(
                  {
                     success:false,
                     message:"Password not matching",
                  }
               )
      }
      
         }catch(err){
            console.error(err.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
         })
         }

}