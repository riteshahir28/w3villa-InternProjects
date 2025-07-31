import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import ProviderContext from './Context/ProviderContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
   
<ProviderContext>
      <App />
     </ProviderContext>
    </BrowserRouter>

  </React.StrictMode>
)

