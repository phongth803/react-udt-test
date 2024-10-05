import React from 'react'
import { render } from '@testing-library/react'
import Hello from './Hello'
import '@testing-library/jest-dom'

test('renders the correct content', () => {
  const { getByText } = render(<Hello name='World' />)
  expect(getByText('Hello, World!')).toBeInTheDocument()
})
