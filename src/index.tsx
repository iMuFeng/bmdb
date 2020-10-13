/**
 * Polyfill must be at the top of this file
 */
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'unfetch/polyfill'
import App from '@/components/App'
import { AppOption } from '@/components/AppContext'
import React from 'react'
import { render } from 'react-dom'

export default async function Bmdb(option: AppOption) {
  render(<App option={option} />, document.querySelector(option.selector))
}
