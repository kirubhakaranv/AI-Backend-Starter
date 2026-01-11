const express=require('express');
const Router=express.Router();
const verifyToken=require('../middleware/verifyToken')
const {signup,login,verifyemail,logout,forgotpassword,checkAuth,resetPassword}=require('../Controllers/authcontrollers');

Router.get("/check-auth",verifyToken,checkAuth);
Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/verify-email",verifyemail)
Router.post("/logout",logout)
Router.post("/forgot-password",forgotpassword)
Router.post("/reset-password/:token", resetPassword);
module.exports=Router;

