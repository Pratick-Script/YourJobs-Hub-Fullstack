import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { ClerkProvider } from '@clerk/react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_YW11c2luZy13ZWV2aWwtMTIuY2xlcmsuYWNjb3VudHMuZGV2JA'

const root = createRoot(document.getElementById('root'))

if (!PUBLISHABLE_KEY) {
  root.render(
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#e11d48', marginBottom: '10px' }}>⚠️ Missing Clerk Publishable Key</h2>
      <p style={{ color: '#4b5563', maxWidth: '480px', lineHeight: '1.6' }}>
        The environment variable <code>VITE_CLERK_PUBLISHABLE_KEY</code> is not available in the current build.
      </p>
      <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '12px' }}>
        Please check your Vercel Environment Variables and trigger a fresh redeploy.
      </p>
    </div>
  )
} else {
  root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  )
}
