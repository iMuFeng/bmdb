import request from '@/utils/request'

export interface Movie {
  id: number
  title: string
  originalTitle?: string
  intro?: string
  cover: string
  rating: string
  directors?: string[]
  countries?: string[]
  genres?: string[]
  pubdate?: string
  linkUrl: string
  starred?: boolean
  tvShow?: boolean
  createdAt: string
}

export interface ApiQuery {
  secret?: string
  page?: number
  starred?: boolean
  category?: string
}

const baseURL = 'https://api.weajs.com/v1'
const urls: Record<string, string | any> = {
  movie: `${baseURL}/movies`,
  book: `${baseURL}/books`,
  category: `${baseURL}/movies/categories`
}

const getDoubanLink = (type: 'movie' | 'book', id: string) => {
  return `https://${type}.douban.com/subject/${id}`
}

export async function fetchCategories(data: ApiQuery): Promise<string[]> {
  return await request(urls.category, {
    data
  })
}

export async function fetchList(
  type: 'movie' | 'book',
  data: ApiQuery
): Promise<Movie[]> {
  const result = await request(urls[type], {
    data
  })

  return result.map((row: any) => {
    row.rating = row.rating.includes('.') ? row.rating : `${row.rating}.0`
    row.linkUrl = getDoubanLink(type, (row as any).doubanId)
    return row
  })
}
