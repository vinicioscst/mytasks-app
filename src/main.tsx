import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/app-routes.tsx'
import { HeroUIProvider } from '@heroui/react'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <AppRoutes />
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
)
