import { ApiQuery } from '@/utils/api'

export function isMobile(): boolean {
  return /iPhone|iPod|\bAndroid(?:.+)Mobile\b/i.test(window.navigator.userAgent)
}

export function hashToQuery(): ApiQuery {
  const hash = window.location.hash.replace(/^#/, '')
  const starred = hash === 'starred'
  const category = starred ? '' : hash.replace(/category\//, '')

  return {
    page: 1,
    starred,
    category: decodeURIComponent(category)
  }
}

export function importScript(src: string) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      handleComplete()
    }, 12e4)
    const script = document.createElement('script')

    function handleComplete(result?: any) {
      clearTimeout(timer)
      script.onload = null
      script.onerror = null

      if (result?.type === 'load') {
        resolve()
      } else {
        reject(new Error(`Failed to load script: ${src}`))
      }
    }

    script.src = src
    script.onload = handleComplete
    script.onerror = handleComplete
    document.head.appendChild(script)
  })
}
