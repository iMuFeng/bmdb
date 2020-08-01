import axios from 'redaxios'

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
  createdAt: string
}

export interface ApiQuery {
  secret?: string
  page?: number
  starred?: boolean
  category?: string
}

const baseURL = 'https://bm.weajs.com/api'
const urls: Record<string, string | any> = {
  movie: `${baseURL}/movies`,
  book: `${baseURL}/books`,
  category: `${baseURL}/movies/categories`
}

const getDoubanLink = (type: string, id: string) => {
  return `https://${type}.douban.com/subject/${id}`
}

export async function fetchCategories(params: ApiQuery): Promise<string[]> {
  const result = await axios.get<string[]>(urls.category, {
    params
  })
  return result.data
}

export async function fetchMovies(
  type: 'movie' | 'book',
  params: ApiQuery
): Promise<Movie[]> {
  const result = await axios.get<Movie[]>(urls[type], {
    params
  })

  return result.data.map(row => {
    row.rating = row.rating.includes('.') ? row.rating : `${row.rating}.0`
    row.linkUrl = getDoubanLink(type, (row as any).doubanId)
    return row
  })
}
