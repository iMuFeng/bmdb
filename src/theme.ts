const light = {
  link: '#157efb',
  dark: '#333',
  gray: '#555',
  grayLight: '#999',
  highlight: '#fccd59',
  bg: '#eee',
  bgDark: '#ddd'
}

const dark = {
  link: '#8ab4f8',
  dark: '#d7d7d7',
  gray: '#d7d7d7',
  grayLight: '#d7d7d7',
  highlight: '#fccd59',
  bg: 'rgba(0, 0, 0, 0.2)',
  bgDark: 'rgba(0, 0, 0, 0.3)'
}

export const lightTheme = {
  ...light,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Helvetica, Roboto, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", STXihei, "Microsoft YaHei", SimHei, "WenQuanYi Micro Hei", serif',
  catFontSize: '17px',
  fontSize: '15px',
  ratingFontSize: '14px',
  lineHeight: '1.7'
}

export const darkTheme = {
  ...lightTheme,
  ...dark
}

export type Theme = typeof lightTheme | typeof darkTheme
