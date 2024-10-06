import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Calculator from './Calculator/Calculator'
import History from './History/History'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Calculator />} />
      <Route path='/history' element={<History />} />
    </Routes>
  )
}

export default App
