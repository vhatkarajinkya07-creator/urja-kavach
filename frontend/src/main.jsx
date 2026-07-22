import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: false, theme: { preset: Aura } }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)


