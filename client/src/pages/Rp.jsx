import React, { useState } from 'react'
import { motion} from 'framer-motion'
import { useAuthStore } from '../store/authStore.js'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../components/Input.jsx'
import toast from 'react-hot-toast'
import { Lock } from 'lucide-react'
const Rp = () => {
    const[password,setPassword]=useState("")
    const[confirmpassword,setConfirmPassword]=useState("");
    const {ResetPassword,error,isLoading,message}=useAuthStore();
    const {token}=useParams();
    const navigate=useNavigate();
    const handlesub=async(e)=>{
        e.preventDefault();
        if(password!==confirmpassword){
            alert("Password does not match");
            return;
        }
        try{ 
        await ResetPassword(token,password);
        toast.success("Passwors reset successful,redirecting to login page...")
        setTimeout(()=>{
            navigate("/login");
        },2000);
        }catch(error){
                console.log(error);
                toast.error(error.message || "Error resetting password")
        }
    };
    return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
    overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                Reset password
            </h2>
            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
            {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}
            <form onSubmit={handlesub}>
                <Input
                 icon={Lock}
                 type='password'
                 placeholder="New Password"
                 value={password}
                 onChange= {(e)=>setPassword(e.target.value)}
                 />
                 <Input
                 icon={Lock}
                 type='password'
                 placeholder="Confirm Password"
                 value={confirmpassword}
                 onChange= {(e)=>setConfirmPassword(e.target.value)}
                 />
                 <motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
						type='submit'>
                            {isLoading? "Resetting...":"Set New PAssword"}</motion.button>
            </form>
        </div>
    </motion.div>
  )
}

export default Rp