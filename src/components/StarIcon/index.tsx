import { classNames } from '@/utils/helper'
import React from 'react'
import styles from './style.scss'

interface StarIconProps {
  isStarred?: boolean
}

const StarIcon: React.FC<StarIconProps> = ({ isStarred = false }) => {
  return (
    <svg
      className={classNames({
        [styles.star]: true,
        [styles.isStarred]: isStarred
      })}
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
      />
    </svg>
  )
}

export default StarIcon
