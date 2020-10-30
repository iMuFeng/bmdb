import { isValid } from '@puckjs/utils/lib/helper'
import * as qs from '@puckjs/utils/lib/qs'

interface RequestOptions {
  data?: any
  headers?: Record<string, string | number | boolean>
  timeout?: number
  credentials?: string
}

const defaultRequestOptions: RequestOptions = {
  timeout: 5e3
}

const request = (url: string, customOptions?: RequestOptions): Promise<any> => {
  const options = {
    ...defaultRequestOptions,
    ...customOptions
  }

  const requestInit: any = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...customOptions?.headers
    },
    credentials: 'same-origin'
  }

  if (isValid(customOptions?.data)) {
    url += `?${qs.stringify(customOptions!.data)}`
    requestInit.headers['Content-Type'] = 'application/json'
  }

  const fp = window.fetch(url, requestInit).then(response => response.json())
  const tp = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('request timeout'))
    }, options.timeout)
  })

  return Promise.race([fp, tp])
}

export default request
