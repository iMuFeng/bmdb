declare module 'react-lazy-load' {
  import React from 'react'

  interface LazyLoadProps {
    offsetVertical?: number
  }

  export default class LazyLoad extends React.PureComponent<LazyLoadProps> {}
}
