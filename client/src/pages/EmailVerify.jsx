import {useEffect, useRef ,useState} from 'react'
import { useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore.js';
import toast from 'react-hot-toast';

// const handle
const EmailVerify = () => {
    const[code,setCode]=useState(['','','','','','']);
    const inputrefs=useRef([]);
    const navigate=useNavigate();
    const{error,isLoading,verifyEmail}=useAuthStore();
    const handleChange=(index,value)=>{
        const newCode=[...code];
        if(value.length>1){
            const pastedCode=value.slice(0,6).split("");
            for(let i=0;i<6;i++){
                newCode[i]=pastedCode[i] || "";
            }
            setCode(newCode);
            const lastfilledindex=newCode.findLastIndex((digit)=>digit!=="");
            const focusIndex=lastfilledindex<5 ?lastfilledindex+1:5;
            inputrefs.current[focusIndex].focus();
        }else{
                newCode[index]=value;
                setCode(newCode);
                if(value && index<5){
                    inputrefs.current[index+1].focus();
                }
        }
    }
    const handleKeyDown=(index,e)=>{
        if(e.key==="Backspace" && !code[index] && index>0){
            inputrefs.current[index-1].focus();
        }
    }

    const handlesubmit=async (e)=>{
        e.preventDefault();
        const verificationcode=code.join("");
        alert(`Verification code submitted: ${verificationcode}`);
        try{
            await verifyEmail(verificationcode);
            await new Promise((resolve)=>setTimeout(resolve,2000));
            navigate("/");
            toast.success("Email Verified Succesfully");
        }catch(error){
                console.log(error)
        }
    }

    useEffect(()=>{
        if(code.every(digit=>digit!=="")){
            handlesubmit(new Event('submit'));
        }
    },[code])
  return (
   <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <motion.div
    initial={{opacity:0,y:-50}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className=' bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Verify Your Email
            </h2>
            <p className='text-gray-300 flex justify-center pb-8'>Enter the 6-digit code sent to your mail address </p>
    <form onSubmit={handlesubmit} className='space-y-6'>
        <div className='flex justify-between'>
           {code.map((digit,index)=>(
                <input
                    key={index}
                    ref={(el)=>(inputrefs.current[index]=el)}
                    type="text"
                    maxLength='6'
                    value={digit}
                    onChange={(e)=>handleChange(index,e.target.value)}
                    onKeyDown={(e)=>handleKeyDown(index,e)}
                    className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none'/>
           ))} 
        </div>
        {error && <p className='text-red-500 font-semibold-mt-2'></p>}
          <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
					>Verify your Email Address</motion.button> 
    </form>
    </motion.div>
   </div>
  )
}

export default EmailVerify;