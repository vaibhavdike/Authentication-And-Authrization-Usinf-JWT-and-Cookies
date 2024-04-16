const express = require('express');
const router =express.Router();
const {signup,login} =require("../controller/Auth");
const {auth,isStudent,isAdmin}=require("../middleware/auth");
router.post("/signup",signup);
router.get("/login",login);

router.get("/test",auth,(req,res)=>{
 res.status(200).json({
    success:true,
    message:"auth test successfull",
 })
})

router.get("/student",auth,isStudent,(req,res)=>{
 res.status(200).json({
    success:true,
    message:"Welcome in student page",
 })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
 res.status(200).json({
    success:true,
    message:"Welcom in admin Page",
 })
})





module.exports=router;