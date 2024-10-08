import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders Calculator component by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument()
  })

  test('navigates to History component and renders history list', () => {
    localStorage.setItem('history', JSON.stringify(['1 + 1 = 2', '3 * 3 = 9']))
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('1. 1 + 1 = 2')).toBeInTheDocument()
    expect(screen.getByText('2. 3 * 3 = 9')).toBeInTheDocument()
  })

  test('updates history when a calculation is performed', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    const history = JSON.parse(localStorage.getItem('history') || '[]')
    expect(history).toContain('1+2 = 3')
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('1. 1+2 = 3')).toBeInTheDocument()
  })

  test('saves history to localStorage when updated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('='))
    const history = JSON.parse(localStorage.getItem('history') || '[]')
    expect(history).toContain('3*4 = 12')
  })
})
