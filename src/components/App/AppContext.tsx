import React from 'react'

export interface AppOption {
  type: 'movie' | 'book'
  selector: string
  secret: string
  darkMode?: boolean
  categories?: string[]
  endOfContentTips?: string
  isMobile?: boolean
}

const AppContext = React.createContext<AppOption>({} as AppOption)
export default AppContext
