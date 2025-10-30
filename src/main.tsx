import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAnalytics, trackPageView } from './analytics'

// Initialize Google Analytics if configured
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
initAnalytics(measurementId)

// Track initial load as home (or current path if served with paths)
if (measurementId) {
  // Use current pathname as default
  trackPageView(window.location.pathname || '/home', document.title)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
