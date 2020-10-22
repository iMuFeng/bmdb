import { useTheme } from '@/hooks'
import { darkTheme, lightTheme } from '@/theme'
import { isMobile } from '@/utils/helper'
import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import AppContext, { AppOption } from './AppContext'
import CategoryList from './CategoryList'
import MovieList from './MovieList'

interface AppProps {
  option: AppOption
}

const defaultOption: Record<string, any> = {
  categories: [],
  noMoreDataTips: 'No more results',
  darkMode: false
}

const App: FC<AppProps> = ({ option: customOption }) => {
  const option: AppOption = {
    ...defaultOption,
    ...customOption,
    isMobile: isMobile()
  }
  const theme = useTheme(option.themeMode, {
    light: {
      ...lightTheme,
      ...customOption.customTheme?.light
    },
    dark: {
      ...darkTheme,
      ...customOption.customTheme?.dark
    }
  })

  return (
    <AppContext.Provider value={option}>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          {option.type === 'movie' && <CategoryList />}
          <MovieList />
        </AppWrapper>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

const AppWrapper = styled.div`
  font-weight: 400;
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  line-height: ${props => props.theme.lineHeight};
  color: ${props => props.theme.dark};

  &,
  * {
    box-sizing: border-box;
  }
`

export default App
