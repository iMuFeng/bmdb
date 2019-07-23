import $ from 'jQuery'
import debounce from 'lodash/debounce'

import config from './config'
import containerTpl from '@/template/container.art'
import listTpl from '@/template/list.art'

class Bmdb {
  constructor ({ type, selector, secret, limit, skeletonNum, noMoreText, fields = [] }) {
    this.apiUrl = `${config.API_BASE_URL}${type || 'movies'}`
    this.noMoreText = noMoreText || ''
    this.skeletonNum = skeletonNum || 5

    this.page = 1
    this.secret = secret
    this.limit = limit || 15
    this.fields = fields
    this.isLoading = false

    this.$container = $(selector)
    this.$window = $(window)

    this.getData()
    this.setViews()
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

    $.ajax({
      url: this.apiUrl,
      data: {
        page: this.page,
        secret: this.secret,
        limit: this.limit,
        fields: this.fields.join(',')
      },
      dataType: 'json'
    }).then(data => {
      if (data.length < this.limit) {
        this.setNoMoreDataView()
        this.offScrollEvent()
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
    data = data.map(item => {
      const halfRating = Math.round(item.rating / 2)

      item.url = `${config.DB_BASE_URL}${item.doubanId}`
      item.stars = Array.from({ length: 5 }).map((_, index) => index + 1 <= halfRating)
      item.rating = item.rating.includes('.') ? item.rating : `${item.rating}.0`

      return item
    })

    this.$list.append(listTpl({
      data
    }))
  }

  setNoMoreDataView () {
    this.$loader.text(this.noMoreText)
  }

  offScrollEvent () {
    this.$window.off('scroll', this.scrollFn)
  }
}

export default Bmdb
