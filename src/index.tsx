/**
 * Polyfill must be at the top of this file
 */
import 'unfetch/polyfill'
import App from '@/components/App'
import { AppOption } from '@/components/AppContext'
import { render } from 'react-dom'

export default function Bmdb(option: AppOption) {
  render(<App option={option} />, document.querySelector(option.selector))
}
