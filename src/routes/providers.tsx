import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'

interface IProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <HeroUIProvider>
      <ToastProvider placement='top-right' />
      {children}
    </HeroUIProvider>
  )
}
