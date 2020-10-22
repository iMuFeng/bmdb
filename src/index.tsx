/**
 * Polyfill must be at the top of this file
 */
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'unfetch/polyfill'
import App from '@/components/App'
import { AppOption } from '@/components/AppContext'
import { render } from 'react-dom'

window.Bmdb = async (option: AppOption) => {
  render(<App option={option} />, document.querySelector(option.selector))
}
