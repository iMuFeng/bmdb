import { useAppOption } from '@/hooks'
import { classNames } from '@/utils/helper'
import React from 'react'
import styles from './style.scss'

const Skeleton: React.FC = () => {
  const option = useAppOption()
  const length = option.isMobile ? 3 : 5
  const skeletons = Array.from({ length })

  return (
    <div
      className={classNames({
        [styles.skeletons]: true,
        [styles.isMobile]: option.isMobile
      })}
    >
      {skeletons.map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <div className={styles.cover} />
          <div className={styles.title} />
          <div className={styles.rating} />
        </div>
      ))}
    </div>
  )
}

export default Skeleton
