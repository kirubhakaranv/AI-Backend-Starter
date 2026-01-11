const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const OpenAI = require("openai");
const connectDB=require('./db/connectDB');
const cookieParser=require('cookie-parser');

dotenv.config();


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// const response = openai.responses.create({
//   model: "gpt-5-nano",
//   input: "write a haiku about ai",
//   store: true, 
// });

// response.then((result) => console.log(result.output_text));
const app=express();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(bodyParser.json());
app.use(cookieParser());

const port=process.env.port || 3000;

//const charroutes=require('./routes/chatRoutes');
const authRoutes=require('./routes/authRoutes');
// app.use("/",charroutes)
app.use("/auth",authRoutes)
app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})