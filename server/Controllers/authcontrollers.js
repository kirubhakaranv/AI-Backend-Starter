const User=require('../model/usermodel');
const crypto=require('crypto');
const bcrypt=require('bcryptjs'); 
const generateTokenandSetCookie=require('../utils/generateTokenandSetCookie');
const {sendVerificationEmail,sendWelcomeEmail,sendPasswordresetemail,sendResetSuccessEmail}=require('../mailtrap/emails');

const signup=async (req,res)=>{
    const{name,email,password}=req.body
    
    try{
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        const userexists=await User.findOne({email});
      //  console.log("useralreadyexists",userexists);
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
    await sendVerificationEmail(user.email,verificationToken);

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

const login=async (req,res)=>{
    const{email,password}=req.body;
    try{
       const user=await User.findOne({email});
       if(!user){
        res.status(400).json({
            success:false,
            message:"Invalid email"
        })
       }
       const ispassvalid=await bcrypt.compare(password,user.password);
       if(!ispassvalid){
        return res.status(404).json({
            success:false,
            message:"Invalid Password"
        })
    }
    generateTokenandSetCookie(res,user._id);
    user.lastLogin=new Date();
    await user.save();

      res.status(201).json({
        success:true,
        message:"User created successfully",
        user:{
            ...user._doc,
            password:undefined,

        }
    })
    }catch(error){
        console.log("Error in login:",error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    } 
}

const verifyemail=async(req,res)=>{
    const {code}=req.body;
    try{
        const user=await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired Verification Code"
            })
        }
        user.isverified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);
        res.status(200).json({
            success:true,
             user: {
                    email: user.email,
                    name: user.name,
                    isverified: user.isverified
                    },
            message:"Email verified successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

const logout=async(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}

const forgotpassword=async(req,res)=>{
    const {email}=req.body;
    try{
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        const resetToken=crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt=Date.now()+60*60*1000;
        user.resetPasswordToken=resetToken;
        user.resetPasswordExpiresAt=resetTokenExpiresAt;
        await user.save();
        await sendPasswordresetemail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({
            success:true,
            message:"reset password mail sent"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message || "reset password mail can't be sent"
        })
    }
}

const resetPassword=async (req,res)=>{
    try{
            const {token}=req.params;
            const {password}=req.body;

            const user=await User.findOne({
                resetPasswordToken:token,
                resetPasswordExpiresAt:{$gt:Date.now()},
            });

            if(!user){
                return res.status(400).json({
                    success:false,
                    message:"Invalid or Expired reset Token"
                });
            }
            const hashedPassword= await bcrypt.hash(password,10);

            user.password=hashedPassword;
            user.resetPasswordToken=undefined;
            user.resetPasswordExpiresAt=undefined;
            await user.save();

            await sendResetSuccessEmail(user.email);
            res.status(200).json({
                success:true,
                message:"Password reset successfull"
            })
    }catch(err){
               res.status(400).json({
                success:false,
                message:"Password reset unsuccessfull"
            })
    }
}

const checkAuth=async (req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password");
        if(!user){
            return  res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true,
            user
        });
    }catch(error){
        console.log("Error in check Auth")
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports={signup,login,verifyemail,logout,forgotpassword,checkAuth,resetPassword};