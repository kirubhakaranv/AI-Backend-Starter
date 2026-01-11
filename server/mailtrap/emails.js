const {transporter,sender}=require('../mailtrap/mailer.config');
const {VERIFICATION_EMAIL_TEMPLATE,welcomeEmail,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE}=require('./emailTemplates')
const sendVerificationEmail=async(email,verificationToken)=>{
    try{
        const response=await transporter.sendMail({
            from:`"${sender.name}" <${sender.email}>`,
            to:email,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationToken),
       
        })
         console.log("Email sent successfully",response);
   }catch(err)
{
    console.error("Error sending email",err);
}    }

const sendWelcomeEmail=async(email,name)=>{
    try{
        const response=await transporter.sendMail({
        from:`"${sender.name}" <${sender.email}>`,
        to:email,
        html:welcomeEmail,
        subject:"Welcome to Fixly Company!",
    })
    console.log("Welcome email sent successfully",response);
    }catch(err){
        console.error("Error sending welcome email",err);
    }
    

}

const sendPasswordresetemail=async(email,resetURL)=>{
    try{
        const respone=await transporter.sendMail({
            from:`"${sender.name}" <${sender.email}>`,
            to:email,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
        })
      
    }catch(error){
        console.error(error.message);
        console.log("Error sendind pass reset mail");
    }
}

const sendResetSuccessEmail=async(email)=>{
       
        try{
            const response=await transporter.sendMail({
                from:`"${sender.name}" <${sender.email}>`,
                to:email,
                subject:'Password reset Successfull',
                html:PASSWORD_RESET_SUCCESS_TEMPLATE
            });
            console.log("Password reset was successfull",response);
        }catch(err){
                console.log("Password reset was unsuccessful")
        }
}

module.exports={sendVerificationEmail,sendWelcomeEmail,sendPasswordresetemail,sendResetSuccessEmail};