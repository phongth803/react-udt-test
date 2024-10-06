import React from 'react'

function Calculator() {
  return (
    <div className='calculator'>
      <div className='header'>
        <span className='circle red'></span>
        <span className='circle yellow'></span>
        <span className='circle green'></span>
      </div>
      <div className='display'>
        <span className='current-value'>0</span>
      </div>
      <div className='buttons'>
        {['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', ',', '='].map(
          (item) => (
            <button
              key={item}
              className={`button ${item === '0' ? 'double-width' : ''} ${['÷', '×', '−', '+', '='].includes(item) ? 'orange' : ''}`}
            >
              {item}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default Calculator
