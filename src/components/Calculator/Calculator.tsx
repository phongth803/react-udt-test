import React, { useState } from 'react'
import { Link } from 'react-router-dom'
interface CalculatorProps {
  handleChangeHistory: (history: string) => void
}

function Calculator(props: CalculatorProps) {
  const [currentValue, setCurrentValue] = useState<string>('0')
  const { handleChangeHistory } = props

  const ops = ['+', '-', '*', '/']

  const formatResult = (result: number) => {
    if (Number.isInteger(result) && result < 1e10) {
      return result.toString()
    }
    if (result >= 1e10 || (result !== 0 && Math.abs(result) < 1e-5)) {
      const resultString = result.toExponential(5)
      return resultString.replace(/\.?0+e/, 'e')
    }
    return parseFloat(result.toFixed(5)).toString()
  }

  const calculate = (value: string) => {
    try {
      value = value.replace(/--/g, '+')
      if (ops.includes(value.slice(-1))) {
        value = value.slice(0, -1) + value.slice(-1) + value.slice(0, -1)
      }
      const result = eval(value)
      const formattedResult = formatResult(result)
      setCurrentValue(formattedResult.toString())
      return formattedResult
    } catch (error) {
      setCurrentValue('Error')
    }
  }

  const handlePersentage = (value: string) => {
    if (ops.includes(value.slice(-1))) {
      setCurrentValue(value.slice(0, -1) + value.slice(-1) + (parseFloat(eval(value.slice(0, -1))) / 100).toString())
      return
    }
    if (value.includes('+') || value.includes('-') || value.includes('*') || value.includes('/')) {
      const lastNumber = value.split(/[\+\-\*\/]/).pop()
      if (lastNumber) {
        setCurrentValue(value.slice(0, -lastNumber.length) + (parseFloat(lastNumber) / 100).toString())
        return
      }
    }
    const result = (parseFloat(eval(value)) / 100).toString()
    handleChangeHistory(value + ' % = ' + result)
    setCurrentValue(formatResult(parseFloat(result)))
  }

  const handleComma = () => {
    if (currentValue === 'Infinity' || currentValue === 'Error') {
      setCurrentValue('0.')
      return
    }
    const lastNumber = currentValue.split(/[\+\-\*\/]/).pop()
    if (lastNumber?.includes('.') || ops.includes(currentValue.slice(-1))) {
      return
    }

    setCurrentValue(currentValue + '.')
  }

  const handlePlusMinus = (value: string) => {
    if (currentValue === 'Infinity' || currentValue === 'Error') {
      setCurrentValue('0')
      return
    }
    if (ops.includes(value.slice(-1)) && !ops.includes(value.slice(-2, -1))) {
      setCurrentValue(value + '-')
      return
    }
    if (ops.includes(value.slice(-1)) && ops.includes(value.slice(-2, -1))) {
      return
    }
    if (value.includes('+') || value.includes('-') || value.includes('*') || value.includes('/')) {
      const lastNumber = value.split(/(?<=[0-9])[\+\-\*\/]/).pop()
      if (lastNumber) {
        setCurrentValue(value.slice(0, -lastNumber.length) + (parseFloat(lastNumber) * -1).toString())
        return
      }
    }
    setCurrentValue((parseFloat(eval(value)) * -1).toString())
  }

  const handleOperator = (operator: string) => {
    if (
      (ops.includes(currentValue.slice(-1)) && ops.includes(operator)) ||
      (currentValue.slice(-1) === '.' && ops.includes(operator))
    ) {
      return
    }
    if (currentValue === 'Infinity' || currentValue === 'Error') {
      setCurrentValue('0' + operator)
      return
    }
    setCurrentValue(currentValue + operator)
  }

  const handleClick = (value: string) => {
    switch (value) {
      case ',':
        handleComma()
        break
      case 'AC':
        if (currentValue === '0') {
          localStorage.removeItem('history')
          return
        }
        setCurrentValue('0')
        break
      case '+/-':
        handlePlusMinus(currentValue)
        break
      case '%':
        handlePersentage(currentValue)
        break
      case '÷':
        handleOperator('/')
        break
      case '×':
        handleOperator('*')
        break
      case '−':
        handleOperator('-')
        break
      case '+':
        handleOperator('+')
        break
      case '=':
        handleChangeHistory(currentValue + ' = ' + calculate(currentValue))
        break
      default:
        if (
          currentValue.length === 23 ||
          (currentValue.slice(-1) === '0' && ops.includes(currentValue[currentValue.length - 2]))
        ) {
          return
        }
        if ((currentValue === '0' && value !== '.') || currentValue === 'Infinity' || currentValue === 'Error') {
          setCurrentValue(value)
        } else {
          setCurrentValue(currentValue + value)
        }
        break
    }
  }
  const hanleOnchageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^[0-9\+\-\*\/\.]*$/.test(e.target.value)) {
      return
    }

    if (e.target.value.length > 23) {
      return
    }

    setCurrentValue(e.target.value)
  }

  return (
    <div className='calculator'>
      <div className='header'>
        <span className='circle red'></span>
        <span className='circle yellow'></span>
        <span className='circle green'></span>
        <Link to='/history' className='history-button'>
          History
        </Link>
      </div>
      <div className='display'>
        <input
          type='text'
          placeholder='0'
          className={`current-value ${currentValue.length > 9 ? 'font-smaller' : ''}`}
          value={currentValue}
          onChange={hanleOnchageInput}
        />
      </div>
      <div className='buttons'>
        {['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', ',', '='].map(
          (item) => (
            <button
              key={item}
              className={`button ${item === '0' ? 'double-width' : ''} ${['÷', '×', '−', '+', '='].includes(item) ? 'orange' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item === 'AC' && currentValue !== '0' ? 'C' : item}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default Calculator
