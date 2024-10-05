import React from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <h1>Hello World</h1>
          </>
        }
      />
      <Route
        path='/a'
        element={
          <>
            <h1>Hello a</h1>
          </>
        }
      />
    </Routes>
  )
}

export default App
