import _React from 'react'
import { AppOption } from './components/AppContext'

export {}

declare global {
  declare type React = _React

  interface Window {
    Bmdb(option: AppOption): Promise<void>
  }
}
