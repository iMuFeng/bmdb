import $ from 'jquery'

import config from '../../config'
import containerTpl from './template/container.art'
import categoryTpl from './template/category.art'

class PluginCategory {
  constructor (app) {
    this.app = app

    if (!this.app.showCategories) {
      return
    }

    this.apiUrl = `${this.app.apiUrl}/categories`
    this.cacheKey = `${this.app.namespace}_categories`.toUpperCase()

    // Parse url category
    this.location = this.parseLocation()
    this.app.category = this.location.query[this.cacheKey]

    this.$container = $(containerTpl()).prependTo(this.app.$container)
    this.$list = this.$container.find('ul')

    this.getData()
  }

  parseLocation () {
    const location = window.location

    return {
      href: location.href,
      origin: location.origin + location.pathname,
      query: this.app.utils.param2object(location.search)
    }
  }

  getData () {
    const loadCache = this.cache

    if (loadCache) {
      const data = this.app.store.get(this.cacheKey)
      this.render(data)
    }

    $.ajax({
      url: this.apiUrl,
      data: {
        secret: this.app.secret
      },
      dataType: 'json',
      success: (data) => {
        if (loadCache) {
          this.app.store.set(this.cacheKey, data)
        }
        this.render(data)
      },
      error: this.errorLogger
    })
  }

  render (categories) {
    const { isEmpty } = this.app.utils

    const defaultCategories = [
      {
        name: '全部',
        url: this.getCategoryUrl(''),
        active: isEmpty(this.app.category)
      }
    ]

    if (this.app.showStarred) {
      defaultCategories.push({
        name: '推荐',
        url: this.getCategoryUrl(config.STARRED),
        active: this.app.category === config.STARRED
      })
    }

    this.$list.append(categoryTpl({
      categories: [
        ...defaultCategories,
        ...(isEmpty(this.app.categoryFilters) ? categories : this.app.categoryFilters.filter(name => categories.includes(name)))
          .map(name => {
            const url = this.getCategoryUrl(name)
            const active = name === this.app.category
            return {
              name,
              active,
              url
            }
          })
      ]
    }))
  }

  getCategoryUrl (name) {
    const { origin, query } = this.location
    return origin + '?' + this.app.utils.object2param({
      ...query,
      [this.cacheKey]: encodeURIComponent(name)
    })
  }
}

export default (app) => {
  // eslint-disable-next-line no-new
  new PluginCategory(app)
}
