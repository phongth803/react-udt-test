import React from 'react'
import '../styles/main.scss'
import AppRoutes from '../routes/AppRoutes'
import { hydrateRoot } from 'react-dom/client'

const root = document.getElementById('root')
if (root) {
  hydrateRoot(root, <AppRoutes />)
}
