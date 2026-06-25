'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { RouterProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from '@/context/ThemeContext'

export function Providers({ children }) {
  const router = useRouter()

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 1,
    })

    let rafId = 0

    const raf = (time) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </RouterProvider>
  )
}
