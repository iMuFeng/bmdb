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
