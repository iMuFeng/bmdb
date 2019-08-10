import isBlank from 'is-blank'

function param2object (param) {
  const obj = {}

  param = param.replace(/^\?/, '')

  if (isBlank(param)) {
    return obj
  }

  const paramArr = param.split('&')

  if (paramArr.length > 0) {
    paramArr.forEach(item => {
      const itemArr = item.split('=')

      if (itemArr.length > 0) {
        const value = itemArr[1]
        obj[itemArr[0]] = isBlank(value) ? '' : decodeURIComponent(value)
      }
    })
  }

  return obj
}

function object2param (obj) {
  const paramArr = []
  const keys = Object.keys(obj)

  if (keys.length > 0) {
    keys.forEach(key => {
      paramArr.push(`${key}=${obj[key]}`)
    })
  }

  return paramArr.join('&')
}

export default {
  param2object,
  object2param
}
