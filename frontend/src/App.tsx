// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Receiver } from './components/Receiver'
import { Sender } from './components/Sender'

function App() {


  return (
    <Routes>
      <Route path='/' element={<div>HOME</div>}/>
      <Route path='/receiver' element={<Receiver/>}/>
      <Route path='/sender' element={<Sender/>}/>
      <Route path="*" element={<div>Error 404</div>}/>
    </Routes>
  )
}

export default App
