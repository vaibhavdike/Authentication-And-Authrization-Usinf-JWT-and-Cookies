const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth =(req,res,next)=>{
  const token =req.body.token;
  try{

    if(!token){
        return res.status(404).json(
            {
                success:false,
                message:"token is missing",
            }
        )
    }
   try{
    const decode = jwt.verify(token,process.env.jwt_SECRET);
    console.log(decode);
    req.user=decode;
    next();
   }catch(err){
    res.status(500).json({
        success:false,
        message:"error in decoding token",
    })
   }


  }catch(err){
     return res.status(404).json({
        success:false,
        message:"Error in matching token",
     })
  }
}


exports.isStudent=(req,res,next)=>{
    try{
     if(req.user.role != "Student"){
        return res.status(404).json(
            {
                success:false,
                message:"These is protected routes for student",
            }
        )
     }
     next();
    }catch(err){
 res.status(400).json(
    {
        success:false,
        message:"error in student middleware",
    }
 )
    }
}







exports.isAdmin=(req,res,next)=>{
    try{
     if(req.user.role != "Admin"){
        return res.status(404).json(
            {
                success:false,
                message:"These is protected routes for Admin",
            }
        )
     }
     next();
    }catch(err){
 res.status(400).json(
    {
        success:false,
        message:"error in Admin middleware",
    }
 )
    }
}