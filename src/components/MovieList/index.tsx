import { useAppOption, useHashChange, useWindowScroll } from '@/hooks'
import { ApiQuery, fetchMovies, Movie } from '@/utils/api'
import { classNames, hashToQuery } from '@/utils/helper'
import throttle from 'lodash/throttle'
import React, { useEffect, useState } from 'react'
import EndOfContent from '../EndOfContent'
import MovieItem from '../MovieItem'
import Skeleton from '../Skeleton'
import styles from './style.scss'

const MovieList: React.FC = () => {
  const option = useAppOption()
  const [query, setQuery] = useState<ApiQuery>(hashToQuery())
  const [movies, setMovies] = useState<Movie[]>([])
  const [pending, setPending] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setPending(true)

    fetchMovies(option.type, {
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
      <div
        className={classNames({
          [styles.list]: true,
          [styles.isMobile]: option.isMobile
        })}
      >
        {movies.map(row => (
          <MovieItem key={row.id} item={row as any} />
        ))}
      </div>
      {pending && <Skeleton />}
      {finished && <EndOfContent />}
    </>
  )
}

export default MovieList
