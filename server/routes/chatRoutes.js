// const express=require('express');
// const dotenv=require('dotenv');
// const OpenAI = require("openai");
// const router=express.Router();


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });



// router.post("/chat",async(req,res)=>{
//     try{
//       const {message}=req.body;
//         const response = await openai.responses.create({
//   model: "gpt-5-nano",
//   input: message,
//   store: true,
// });
// res.json({
//     reply:response.output_text,
// });

//     }catch(error){
//         res.status(500).send(error.message);
//         }
// })

// module.exports = router;