import { useAppOption } from '@/hooks'
import React from 'react'
import styles from './style.scss'

const EndOfContent: React.FC = () => {
  const option = useAppOption()
  return <div className={styles.end}>{option.endOfContentTips}</div>
}

export default EndOfContent
