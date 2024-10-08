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
      if (ops.includes(value) && value.length === 1) {
        setCurrentValue('0')
        return
      }
      if (ops.includes(value.slice(-1))) {
        value = value.slice(0, -1) + value.slice(-1) + value.slice(0, -1)
      }
      if (ops.includes(value[0])) {
        value = value.slice(1) + value[0] + value.slice(1)
      }
      const result = eval(value)
      const formattedResult = formatResult(result)
      setCurrentValue(formattedResult.toString())
      handleChangeHistory(value + ' = ' + formattedResult)
    } catch (error) {
      setCurrentValue('Error')
    }
  }

  const handlePersentage = (value: string) => {
    const result = (parseFloat(eval(value)) / 100).toString()
    handleChangeHistory(value + ' % = ' + result)
    setCurrentValue(formatResult(parseFloat(result)))
  }

  const handleComma = () => {
    const lastNumber = currentValue.split(/[\+\-\*\/]/).pop()
    if (lastNumber?.includes('.') || ops.includes(currentValue.slice(-1))) {
      return
    }

    setCurrentValue(currentValue + '.')
  }

  const handleOperator = (operator: string) => {
    if (
      (ops.includes(currentValue.slice(-1)) && ops.includes(operator)) ||
      (currentValue.slice(-1) === '.' && ops.includes(operator))
    ) {
      return
    }
    if (currentValue === '0') {
      setCurrentValue(operator)
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
        setCurrentValue((parseFloat(eval(currentValue)) * -1).toString())
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
        calculate(currentValue)
        break
      default:
        if (
          currentValue.length === 23 ||
          (currentValue.slice(-1) === '0' && ops.includes(currentValue[currentValue.length - 2]))
        ) {
          return
        }
        if (currentValue === '0' && value !== '.') {
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
