'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-1.5 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
        <div className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-1.5 sm:p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" />
      ) : (
        <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
      )}
    </button>
  )
}
