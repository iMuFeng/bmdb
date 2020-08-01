import MovieCategoryList from '@/components/MovieCategoryList'
import { classNames, isMobile } from '@/utils/helper'
import React from 'react'
import MovieList from '../MovieList'
import AppContext, { AppOption } from './AppContext'
import styles from './style.scss'

interface AppProps {
  option: AppOption
}

const defaultOption: Record<string, any> = {
  categories: [],
  endOfContentTips: 'End of content',
  darkMode: false
}

const App: React.FC<AppProps> = ({ option: customOption }) => {
  const option = {
    ...defaultOption,
    ...customOption,
    isMobile: isMobile()
  }

  return (
    <AppContext.Provider value={option}>
      <div
        className={classNames({
          [styles.app]: true,
          [styles.darkMode]: option.darkMode
        })}
      >
        {option.type === 'movie' && <MovieCategoryList />}
        <MovieList />
      </div>
    </AppContext.Provider>
  )
}

export default App
