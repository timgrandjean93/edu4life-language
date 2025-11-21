import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Analytics initialization is now handled by App component after cookie consent
// This ensures GDPR compliance - analytics only loads if user consents

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
