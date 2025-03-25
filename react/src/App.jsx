// import { useState } from 'react'

import Home from './components/Home'
import './App.css'
import { RoleProvider } from './context/RoleContext'; // ✅ Import the correct provider


function App() {


  return (
    <RoleProvider> 
      <Home />
    </RoleProvider>
  
  )
}

export default App
