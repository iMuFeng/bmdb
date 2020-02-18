import $ from 'jQuery'
import 'lazyload'
import debounce from 'lodash/debounce'

import store from './store'
import config from './config'
import urlParam from './urlParam'

import pluginCategory from './plugins/category'

import containerTpl from '@/template/container.art'
import listTpl from '@/template/list.art'

export default class Bmdb {
  constructor ({
    type,
    selector,
    secret,
    limit,
    showCategories,
    showStarred,
    categoryFilters,
    skeletonNum,
    noMoreText,
    cache,
    darkMode
  }) {
    this.isMovieRequest = type === 'movies'
    this.type = this.isMovieRequest ? 'movies' : 'books'
    this.apiUrl = config.API_BASE_URL + this.type
    this.noMoreText = noMoreText || ''
    this.skeletonNum = skeletonNum || 5

    this.page = 1
    this.secret = secret
    this.limit = limit || 30
    this.isLoading = false

    this.category = undefined
    this.showStarred = showStarred !== undefined ? !!showStarred : true
    this.categoryFilters = categoryFilters || []
    this.showCategories = this.isMovieRequest ? !!showCategories : false

    this.cache = cache !== undefined ? !!cache : true
    this.namespace = `bmdb_${this.type}`.toUpperCase()
    this.cacheKey = null

    this.darkMode = darkMode !== undefined ? !!darkMode : true

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
      darkMode: this.darkMode,
      skeletons: Array.from({ length: this.skeletonNum })
    }))

    if (this.darkMode) {
      this.$container.addClass('bmdb-dark-mode')
    }

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
      this.cacheKey = this.category ? this.namespace + ':' + this.category : this.namespace
      const data = this.store.get(this.cacheKey)
      this.render(data)
    }

    const requestData = {
      page: this.page,
      limit: this.limit,
      secret: this.secret
    }

    if (this.category) {
      if (this.category === config.STARRED) {
        requestData.starred = true
      } else {
        requestData.category = this.category
      }
    }

    $.ajax({
      url: this.apiUrl,
      data: requestData,
      dataType: 'json',
      success: (data) => {
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
      },
      error: (err) => {
        this.isLoading = false
        console.error('[BMDB]', err)
      }
    })
  }

  render (data) {
    if (data.length > 0) {
      const baseUrl = this.isMovieRequest ? config.MOVIE_BASE_URL : config.BOOK_BASE_URL

      data = data.map(item => {
        const halfRating = Math.round(item.rating / 2)

        item.doubanUrl = baseUrl + item.doubanId
        item.stars = Array.from({ length: 5 }).map((_, index) => index + 1 <= halfRating)
        item.rating = item.rating.includes('.') ? item.rating : `${item.rating}.0`

        return item
      })

      const $data = $(listTpl({ data }))

      this.$list.append($data)
      $data.find('img.bmdb-cover-image').lazyload({
        src: 'data-cover'
      })
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
