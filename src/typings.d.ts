import { AppOption } from './components/AppContext'

export {}

declare module 'react-lazy-load' {
  import React from 'react'

  interface LazyLoadProps {
    offsetVertical?: number
  }

  export default class LazyLoad extends React.PureComponent<LazyLoadProps> {}
}

declare global {
  interface Window {
    Bmdb(option: AppOption): Promise<void>
  }
}
