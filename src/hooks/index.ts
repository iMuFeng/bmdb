import AppContext, { AppOption } from '@/components/AppContext'
import { Theme } from '@/theme'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'

export function useAppOption(): AppOption {
  return useContext(AppContext)
}

export function useHashChange(listener: () => any) {
  useEffect(() => {
    window.addEventListener('hashchange', listener)

    return () => {
      window.removeEventListener('hashchange', listener)
    }
  }, [])
}

export function useWindowScroll(listener: () => any, interrupt: boolean, deps: any[]) {
  useEffect(() => {
    if (!interrupt) {
      window.addEventListener('scroll', listener)

      return () => {
        window.removeEventListener('scroll', listener)
      }
    }
  }, [interrupt, ...deps])
}

export function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])
}

export function useTheme(
  mode: 'light' | 'dark' | 'auto' = 'auto',
  themes: {
    light: Theme
    dark: Theme
  }
) {
  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia ? window.matchMedia(preferDarkQuery) : undefined
  const [theme, setTheme] = useState<Theme>(
    mode === 'dark' || (mode === 'auto' && mql?.matches) ? themes.dark : themes.light
  )

  function handler() {
    if (mode === 'auto') {
      setTheme(mql?.matches ? themes.dark : themes.light)
    }
  }

  useEffect(() => {
    mql?.addEventListener
      ? mql.addEventListener('change', handler)
      : mql?.addListener(handler)

    return () => {
      mql?.removeEventListener
        ? mql.removeEventListener('change', handler)
        : mql?.removeListener(handler)
    }
  }, [])

  return theme
}
