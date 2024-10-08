import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Calculator from './Calculator'
import { MemoryRouter } from 'react-router-dom'

describe('Calculator Component', () => {
  let handleChangeHistory: jest.Mock
  beforeEach(() => {
    handleChangeHistory = jest.fn()
  })

  test('renders Calculator component and checks basic UI', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toBe(19)
  })

  test('should update input value when numbers are clicked', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('5'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('75')
  })

  test('should clear input when C is pressed', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('7'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('7')
    fireEvent.click(screen.getByText('C'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should perform addition operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('2')
  })

  test('should not perform addition operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should perform addition operation when not entering the second number', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('2')
  })

  test('should perform subtraction operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('−'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should not perform subtraction operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('−'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should perform multiplication operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('6')
  })

  test('should not perform multiplication operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should perform division operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('3')
  })

  test('should not perform division operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should perform percentage operation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('%'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0.05')
  })

  test('should perform percentage operation when no number is entered', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('%'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should change sign of the number', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+/-'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('-5')
  })

  test('should not change sign of the number when no number is entered', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('+/-'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('0')
  })

  test('should add decimal point to the number', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText(','))
    fireEvent.click(screen.getByText('6'))
    expect(screen.getByPlaceholderText('0')).toHaveValue('5.6')
  })

  test('should not add decimal point to the number when already present', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText(','))
    fireEvent.click(screen.getByText(','))
    expect(screen.getByPlaceholderText('0')).toHaveValue('5.')
  })

  test('should perform big number calculation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('1e+16')
  })

  test('should perform small number calculation', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText(','))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText(','))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByPlaceholderText('0')).toHaveValue('1e-12')
  })

  // history
  test('should show history of calculations', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('='))
    expect(handleChangeHistory).toHaveBeenCalledWith('5+5 = 10')
  })

  test('should show history of calculations with percentage', () => {
    render(
      <MemoryRouter>
        <Calculator handleChangeHistory={handleChangeHistory} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('%'))
    expect(handleChangeHistory).toHaveBeenCalledWith('5 % = 0.05')
  })
})
