import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navigate, Route,Routes} from 'react-router-dom'
import FloatingShape from './components/FloatingShape.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import Fp from './pages/Fp.jsx'
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from './store/authStore.js';
import LoadingSpinner from './components/LoadingSpinner.jsx'
import Rp from './pages/Rp.jsx'  

//protect routes which require authentication

const ProtectRoutes=({children})=>{
  const{isAuthenticated,user}=useAuthStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>;
  }
  if(!user.isverified){
    return <Navigate to="/verify-email" replace/>
  }
  return children;
}
const RedirectAuthUser=({children})=>{
  const {isAuthenticated,user}=useAuthStore();
  if(isAuthenticated && user.isverified){
    return<Navigate to="/" replace/>
  }
  return children;
}
function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore();
  const [count, setCount] = useState(0)
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner/>;

  console.log("isauthenticated",isAuthenticated)
  console.log("user",user);
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
          <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
       <FloatingShape color='bg-green-500' size='w-64 h-64' top='70%' left='80%' delay={5} />
       <FloatingShape color='bg-green-500' size='w-64 h-64' top='40%' left='-10%' delay={2} />   
         <Routes>
          <Route path="/" element={<ProtectRoutes><HomePage/></ProtectRoutes>}/>
          <Route path="/signup" element={<RedirectAuthUser>
            <SignUpPage/>
            </RedirectAuthUser>}/>
          <Route path="/login" element={<RedirectAuthUser>
            <LoginPage/>
            </RedirectAuthUser>}/>
          <Route path="/forgot-password" element={<Fp/>}/>
          <Route path="/verify-email" element={<EmailVerify/>}/>
            <Route path="/reset-password/:token"element={<RedirectAuthUser><Rp/></RedirectAuthUser>}/>
        </Routes>  
        <Toaster/>   
      </div>

       
      </>
  )
}

export default App
