import React, { act } from 'react'
import { useState } from 'react'
import './LoginSignUp.css'
import user from '../assets/user.png'
import password from '../assets/password.png'
import email from '../assets/email.png'

const LoginSignUp=()=>{
    const[action,setAction]=useState("Login");
    return<>
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
            </div>
            <div className="inputs">
                {action==="Login"?
                <div></div>:
                <div className="input">
                    <img src={user} alt="" />
                    <input type="text" placeholder="Name"/>
                </div>}
                
                 <div className="input">
                    <img src={email} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>
                 <div className="input">
                    <img src={password} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action==="Sign Up"?<div></div>: <div className="forgot-pass">Lost Password?<span>Click here </span></div>}
           
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>SignUp</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction('Login')}}>Login</div>
            </div>
            
    
    </div>
    </>
}

export default LoginSignUp;