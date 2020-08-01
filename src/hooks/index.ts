import { AppContext, AppOption } from '@/components/App'
import { useContext, useEffect, useLayoutEffect, useRef } from 'react'

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

export function useLatest<T extends any>(current: T) {
  const storedValue = useRef(current)
  storedValue.current = current
  return storedValue
}
