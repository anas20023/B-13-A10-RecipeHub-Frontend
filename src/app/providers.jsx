'use client'

import { RouterProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from '@/context/ThemeContext'

export function Providers({ children }) {
  const router = useRouter()

  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </RouterProvider>
  )
}
