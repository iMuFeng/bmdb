function get (cacheKey) {
  try {
    const dataString = window.localStorage.getItem(cacheKey)

    if (dataString) {
      const data = JSON.parse(dataString)

      if (Array.isArray(data)) {
        return data
      }
    }
  } catch (_) {
  }

  return []
}

function set (cacheKey, data) {
  try {
    window.localStorage.setItem(cacheKey, JSON.stringify(data))
  } catch (_) {
  }
}

export default {
  get,
  set
}
