import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Calculator from './Calculator/Calculator'
import History from './History/History'

function App() {
  const [history, setHistory] = React.useState<string[]>([])

  useEffect(() => {
    const history = localStorage.getItem('history')
    if (history) {
      setHistory(JSON.parse(history))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  const handleChangeHistory = (history: string) => {
    setHistory((prev) => [...prev, history])
  }
  return (
    <Routes>
      <Route path='/' element={<Calculator handleChangeHistory={handleChangeHistory} />} />
      <Route path='/history' element={<History history={history} />} />
    </Routes>
  )
}

export default App
