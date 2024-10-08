import React from 'react'
import { Link } from 'react-router-dom'
interface HistoryProps {
  history: string[]
}

function History(props: HistoryProps) {
  const { history } = props
  return (
    <div className='calculator history'>
      <Link to='/' className='history-button'>
        🔙
      </Link>
      <h1>History</h1>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{`${index + 1}. ${item}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default History
