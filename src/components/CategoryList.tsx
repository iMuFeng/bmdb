import { useAppOption, useHashChange } from '@/hooks'
import { ApiQuery, fetchCategories } from '@/utils/api'
import { hashToQuery } from '@/utils/helper'
import { isEmpty, isValid } from '@puckjs/utils/lib/helper'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

interface LinkProps {
  href: string
  title: string
  active?: boolean
}

const Link: FC<LinkProps> = ({ href, title, active }) => {
  return (
    <LinkWrapper href={href} active={active}>
      {title}
    </LinkWrapper>
  )
}

const CategoryList: FC = () => {
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
    <List>
      <Link href="#" title="全部" active={isEmpty(query.category) && !query.starred} />
      <Link href="#starred" title="推荐" active={query.starred} />
      {categories.map((row, index) => (
        <Link
          key={index}
          href={`#category/${row}`}
          title={row}
          active={query.category === row}
        />
      ))}
    </List>
  )
}

const List = styled.div`
  margin-bottom: 30px;
  white-space: pre-line;
`

const LinkWrapper = styled.a<{
  active?: boolean
}>`
  display: inline-block;
  margin-right: 15px;
  color: ${props => props.theme.gray};
  text-decoration: none;
  font-size: ${props => props.theme.catFontSize};

  ${props => props.active && `color: ${props.theme.link}`};

  &:hover {
    color: ${props => props.theme.link};
  }
`

export default CategoryList
