import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from './App'
import AppRoutes from './components/Router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
