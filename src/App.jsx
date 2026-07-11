import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Lenta from './components/lenta/Lenta'

function App() {
  

  return (
    <div>
      
      <Routes>

        <Route path='/' Component={Lenta}/>
      </Routes>

    </div>
  )
}

export default App
