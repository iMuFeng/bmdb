import $ from 'jQuery'
import debounce from 'lodash/debounce'

import store from './store'
import config from './config'
import urlParam from './urlParam'

import pluginCategory from './plugins/category'

import containerTpl from '@/template/container.art'
import listTpl from '@/template/list.art'

export default class Bmdb {
  constructor ({ type, selector, secret, limit, showCategories, categoryFilters, skeletonNum, noMoreText, cache }) {
    this.apiUrl = `${config.API_BASE_URL}${type || 'movies'}`
    this.noMoreText = noMoreText || ''
    this.skeletonNum = skeletonNum || 5

    this.page = 1
    this.secret = secret
    this.limit = limit || 30
    this.isLoading = false

    this.category = undefined
    this.categoryFilters = categoryFilters || []
    this.showCategories = type === 'movies' ? !!showCategories : false

    this.cache = cache !== undefined ? !!cache : true
    this.cacheKey = `bmdb_${type}`.toUpperCase()

    this.store = store
    this.urlParam = urlParam

    this.$container = $(selector)
    this.$window = $(window)

    this.setViews()
    this.addPlugin(pluginCategory)
    this.getData()
    this.bindScrollEvent()
  }

  setViews () {
    this.$container.append(containerTpl({
      skeletons: Array.from({ length: this.skeletonNum })
    }))

    this.$list = this.$container.find('.bmdb-list .bmdb-ul')
    this.$loader = this.$container.find('.bmdb-loader')
  }

  bindScrollEvent () {
    this.scrollFn = debounce(() => {
      this.onScroll()
    }, 16)
    this.$window.on('scroll', this.scrollFn)
  }

  onScroll () {
    if (this.$window.scrollTop() + this.$window.height() + 100 > this.$loader.offset().top) {
      this.getData()
    }
  }

  getData () {
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    const loadCache = this.cache && this.page === 1

    if (loadCache) {
      const data = this.store.get(this.cacheKey)
      this.render(data)
    }

    const requestData = {
      page: this.page,
      limit: this.limit,
      secret: this.secret
    }

    if (this.category) {
      requestData.category = this.category
    }

    $.ajax({
      url: this.apiUrl,
      data: requestData,
      dataType: 'json'
    }).then(data => {
      if (data.length < this.limit) {
        this.setNoMoreDataView()
        this.offScrollEvent()
      }

      if (loadCache) {
        this.$list.html('')
        this.store.set(this.cacheKey, data)
      }

      this.render(data)

      this.page += 1
      this.isLoading = false
    }).catch(err => {
      this.isLoading = false
      console.error('[BMDB]', err)
    })
  }

  render (data) {
    if (data.length > 0) {
      data = data.map(item => {
        const halfRating = Math.round(item.rating / 2)

        item.doubanUrl = `${config.DB_BASE_URL}${item.doubanId}`
        item.stars = Array.from({ length: 5 }).map((_, index) => index + 1 <= halfRating)
        item.rating = item.rating.includes('.') ? item.rating : `${item.rating}.0`

        return item
      })

      this.$list.append(listTpl({
        data
      }))
    }
  }

  setNoMoreDataView () {
    this.$loader.text(this.noMoreText)
  }

  offScrollEvent () {
    this.$window.off('scroll', this.scrollFn)
  }

  addPlugin (plugin) {
    plugin(this)
  }
}
