const User=require('../model/usermodel');
const bcrypt=require('bcryptjs'); 
const generateTokenandSetCookie=require('../utils/generateTokenandSetCookie');
const signup=async (req,res)=>{
    const{name,email,password}=req.body
    
    try{
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        const userexists=await User.findOne({email});
        console.log("useralreadyexists",userexists);
        if(userexists){
            return res.status(409).json({success:false,message:"User already exists"});
        }

    const hashpass=await bcrypt.hash(password,10);
    const verificationToken= Math.floor(100000+Math.random()*900000).toString();

    const user=new User({
        name,
        email,
        password:hashpass,
        verificationToken,
        verificationTokenExpiresAt:Date.now()+24*60*60*1000 // 24 hours
        
    })

    await user.save();
    generateTokenandSetCookie(res,user._id);

    res.status(201).json({
        success:true,
        message:"User created successfully",
        user:{
            ...user._doc,
            password:undefined,

        }
    })
    }catch(error){
            res.status(500).json({success:false,message:error.message});
    }
}

const login=(req,res)=>{
    res.send("Login Router")
}

module.exports={signup,login};