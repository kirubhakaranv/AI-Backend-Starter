const express=require('express');
const Router=express.Router();
const {signup,login,verifyemail,logout,forgotpassword}=require('../Controllers/authcontrollers');


Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/verify-email",verifyemail)
Router.post("/logout",logout)
Router.post("/forgot-password",forgotpassword)
module.exports=Router;

