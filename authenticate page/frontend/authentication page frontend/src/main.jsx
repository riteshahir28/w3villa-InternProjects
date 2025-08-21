import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'   // 👉 yeh import missing tha
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './authcontext'
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
    <BrowserRouter>

      <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
