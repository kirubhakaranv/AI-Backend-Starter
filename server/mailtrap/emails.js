const {mailtrapclient,sender}=require('../mailtrap/mailtrap.config');
const {VERIFICATION_EMAIL_TEMPLATE}=require('./emailTemplates')
const sendVerficationEmail=async(email,verificationToken)=>{
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

module.exports=sendVerficationEmail;