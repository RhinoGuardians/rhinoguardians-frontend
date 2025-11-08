import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

/**
 * ThemeProvider - Supports 3-state theme management (light / dark / system)
 * Following Tailwind CSS 4.1 class-driven dark mode pattern
 */
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    // Check localStorage first, default to system
    return localStorage.getItem('rhino-theme') || 'system'
  })

  const applyTheme = (mode) => {
    const root = document.documentElement

    if (mode === 'system') {
      // Use system preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemDark)
      localStorage.removeItem('rhino-theme')
    } else {
      // Use explicit theme (light or dark)
      root.classList.toggle('dark', mode === 'dark')
      localStorage.setItem('rhino-theme', mode)
    }
  }

  useEffect(() => {
    // Apply theme on mount and when mode changes
    applyTheme(themeMode)

    // Listen to system preference changes when in "system" mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e) => {
      const currentMode = localStorage.getItem('rhino-theme')
      if (!currentMode || currentMode === 'system') {
        document.documentElement.classList.toggle('dark', e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [themeMode])

  const setTheme = (mode) => {
    setThemeMode(mode)
  }

  const toggleTheme = () => {
    // Simple toggle between light and dark (preserves legacy behavior)
    setThemeMode((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'light'
      // If system, check current and toggle
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemDark ? 'light' : 'dark'
    })
  }

  // Get the actual theme being displayed (resolves 'system' to light/dark)
  const getActiveTheme = () => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return themeMode
  }

  return (
    <ThemeContext.Provider value={{
      theme: themeMode,
      activeTheme: getActiveTheme(),
      setTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
