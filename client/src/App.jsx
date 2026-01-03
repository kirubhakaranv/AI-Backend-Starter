import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginSignUp from './components/LoginSignUp.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <LoginSignUp/>
      </div>
     
    </>
  )
}

export default App
