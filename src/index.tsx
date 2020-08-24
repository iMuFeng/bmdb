import App from '@/components/App'
import { AppOption } from '@/components/AppContext'
import { importScript } from '@/utils/helper'
import React from 'react'
import { render } from 'react-dom'

export default async function Bmdb(option: AppOption) {
  if (!window.fetch) {
    await importScript(
      'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js'
    )
  }

  render(<App option={option} />, document.querySelector(option.selector))
}
