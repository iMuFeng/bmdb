import { useAppOption, useHashChange, useWindowScroll } from '@/hooks'
import { ApiQuery, fetchList, Movie } from '@/utils/api'
import { hashToQuery } from '@/utils/helper'
import throttle from 'lodash/throttle'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import MovieItem from './MovieItem'
import Skeleton from './Skeleton'

const MovieList: FC = () => {
  const option = useAppOption()
  const [query, setQuery] = useState<ApiQuery>(hashToQuery())
  const [movies, setMovies] = useState<Movie[]>([])
  const [pending, setPending] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setPending(true)

    fetchList(option.type, {
      secret: option.secret,
      ...query
    })
      .then(result => {
        if (result.length < 30) {
          setFinished(true)
        }

        setMovies([...movies, ...result])
      })
      .finally(() => setPending(false))
  }, [query])

  useHashChange(() => {
    setMovies([])
    setFinished(false)
    setQuery(hashToQuery())
  })

  useWindowScroll(throttle(handleWindowScroll, 200), finished, [pending])

  function handleWindowScroll() {
    const windowHeight = window.innerHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const documentHeight =
      document.documentElement.offsetHeight || document.body.clientHeight

    if (windowHeight + scrollTop + 300 < documentHeight || pending || finished) {
      return
    }

    setQuery(query => ({
      ...query,
      page: query.page! + 1
    }))
  }

  return (
    <>
      <ListWrapper isMobile={option.isMobile}>
        {movies.map(row => (
          <MovieItem key={row.id} item={row as any} />
        ))}
      </ListWrapper>
      {pending && <Skeleton />}
      {finished && <ListEndTips>{option.noMoreDataTips}</ListEndTips>}
    </>
  )
}

export const ListWrapper = styled.div<{
  isMobile?: boolean
}>`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2%;
  background: none;
  line-height: 100%;

  ${props =>
    props.isMobile &&
    `
    & > div {
      width: 29.33%;
    }
  `}
`

const ListEndTips = styled.div`
  margin-bottom: 20px;
  text-align: center;
  color: ${props => props.theme.grayLight};
`

export default MovieList
