import { useAppOption, useHashChange } from '@/hooks'
import { ApiQuery, fetchCategories } from '@/utils/api'
import { classNames, hashToQuery } from '@/utils/helper'
import { isEmpty, isValid } from '@puckjs/utils/lib/helper'
import React, { useEffect, useState } from 'react'
import styles from './style.scss'

interface CategoryLinkProps {
  href: string
  title: string
  active?: boolean
}

const CategoryLink: React.FC<CategoryLinkProps> = ({ href, title, active }) => {
  return (
    <a
      href={href}
      className={classNames({
        [styles.link]: true,
        [styles.active]: active
      })}
    >
      {title}
    </a>
  )
}

const MovieCategoryList: React.FC = () => {
  const option = useAppOption()
  const [query, setQuery] = useState<ApiQuery>(hashToQuery())
  const [categories, setCategories] = useState<string[]>([])

  useHashChange(() => {
    setQuery(hashToQuery())
  })

  useEffect(() => {
    fetchCategories({
      secret: option.secret
    }).then(result => {
      setCategories(
        isValid(option.categories)
          ? option.categories!.filter(name => result.includes(name))
          : result
      )
    })
  }, [])

  return (
    <div className={styles.list}>
      <CategoryLink
        href="#"
        title="全部"
        active={isEmpty(query.category) && !query.starred}
      />
      <CategoryLink href="#starred" title="推荐" active={query.starred} />
      {categories.map((row, index) => (
        <CategoryLink
          key={index}
          href={`#category/${row}`}
          title={row}
          active={query.category === row}
        />
      ))}
    </div>
  )
}

export default MovieCategoryList
