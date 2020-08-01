import { Movie } from '@/utils/api'
import React from 'react'
// @ts-ignore
import LazyLoad from 'react-lazy-load'
import StarIcon from '../StarIcon'
import styles from './style.scss'

interface MovieItemProps {
  item: Movie
}

interface MovieCoverProps {
  cover: string
  title: string
}

interface MovieStarsProps {
  rating: number
}

const MovieCover: React.FC<MovieCoverProps> = ({ cover, title }) => {
  return (
    <div className={styles.cover}>
      <LazyLoad offsetVertical={0}>
        <img className={styles.image} src={cover} alt={title} width="150" height="220" />
      </LazyLoad>
    </div>
  )
}

const MovieStars: React.FC<MovieStarsProps> = ({ rating }) => {
  const half = Math.round(rating / 2)
  const starred = Array.from({ length: 5 }).map((_, i) => i < half)

  return (
    <span className={styles.stars}>
      {starred.map((isStarred, index) => (
        <StarIcon key={index} isStarred={isStarred} />
      ))}
    </span>
  )
}

const MovieItem: React.FC<MovieItemProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <a href={item.linkUrl} target="_blank">
        <MovieCover cover={item.cover} title={item.title} />
        <div className={styles.title}>{item.title}</div>
        <div className={styles.rating}>
          <MovieStars rating={Number(item.rating)} />
          <span className={styles.ratingNumber}>{item.rating}</span>
        </div>
      </a>
    </div>
  )
}

export default MovieItem
