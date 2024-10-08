import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import History from './History'

describe('History Component', () => {
  test('renders History component and displays history list correctly', () => {
    const history = ['2 + 2 = 4', '3 + 3 = 6', '5 * 2 = 10']
    render(
      <MemoryRouter>
        <History history={history} />
      </MemoryRouter>
    )
    expect(screen.getByText('History')).toBeInTheDocument()
    history.forEach((item, index) => {
      expect(screen.getByText(`${index + 1}. ${item}`)).toBeInTheDocument()
    })
  })

  test('renders back button with correct link', () => {
    const history = ['2 + 2 = 4']
    render(
      <MemoryRouter>
        <History history={history} />
      </MemoryRouter>
    )
    const backButton = screen.getByText('🔙')
    expect(backButton).toBeInTheDocument()
    expect(backButton.closest('a')).toHaveAttribute('href', '/')
  })
})
