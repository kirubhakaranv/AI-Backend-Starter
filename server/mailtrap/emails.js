const {mailtrapclient,sender}=require('../mailtrap/mailtrap.config');
const {VERIFICATION_EMAIL_TEMPLATE,welcomeEmail,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE}=require('./emailTemplates')
const sendVerificationEmail=async(email,verificationToken)=>{
    const recipient=[{email}];
    try{
        const response=await mailtrapclient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationToken),
            category:"Email verification"
        })
         console.log("Email sent successfully",response);
   }catch(err)
{
    console.error("Error sending email",err);
}    }

const sendWelcomeEmail=async(email,name)=>{
    const recipient=[{email}];
    try{
        const response=await mailtrapclient.send({
        from:sender,
        to:recipient,
        html:welcomeEmail,
        subject:"Welcome to Fixly Company!",
    })
    console.log("Welcome email sent successfully",response);
    }catch(err){
        console.error("Error sending welcome email",err);
    }
    

}

const sendPasswordresetemail=async(email,resetURL)=>{
    const recipient=[{email}];
    try{
        const respone=await mailtrapclient.send({
            from:sender,
            to:recipient,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
        })
      
    }catch(error){
        console.log("Error sendind pass reset mail");
    }
}

const sendResetSuccessEmail=async(email)=>{
        const recipient=[{email}];
        try{
            const response=await mailtrapclient.send({
                from:sender,
                to:recipient,
                subject:'Password reset Successfull',
                html:PASSWORD_RESET_SUCCESS_TEMPLATE,
                category:"Password Reset"
            });
            console.log("Password reset was successfull",response);
        }catch(err){
                console.log("Password reset was unsuccessful")
        }
}

module.exports={sendVerificationEmail,sendWelcomeEmail,sendPasswordresetemail,sendResetSuccessEmail};