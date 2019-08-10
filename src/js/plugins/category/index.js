import $ from 'jQuery'
import isBlank from 'is-blank'

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
      query: this.app.urlParam.param2object(location.search)
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
      dataType: 'json'
    }).then(data => {
      if (loadCache) {
        this.app.store.set(this.cacheKey, data)
      }

      this.render(data)
    }).catch(err => {
      console.error('[BMDB]', err)
    })
  }

  render (categories) {
    const all = {
      name: '全部',
      url: this.getCategoryUrl(''),
      active: isBlank(this.app.category)
    }

    this.$list.append(categoryTpl({
      categories: [
        all,
        ...(isBlank(this.app.categoryFilters) ? categories : categories.filter(name => this.app.categoryFilters.includes(name)))
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
    return origin + '?' + this.app.urlParam.object2param({
      ...query,
      [this.cacheKey]: encodeURIComponent(name)
    })
  }
}

export default (app) => {
  // eslint-disable-next-line no-new
  new PluginCategory(app)
}
