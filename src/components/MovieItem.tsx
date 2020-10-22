import { Movie } from '@/utils/api'
import { FC } from 'react'
import LazyLoad from 'react-lazy-load'
import styled from 'styled-components'
import StarIcon from './StarIcon'

interface MovieItemProps {
  item: Movie
}

interface CoverProps {
  cover: string
  title: string
}

interface StarsProps {
  rating: number
}

const Cover: FC<CoverProps> = ({ cover, title }) => {
  return (
    <CoverWrapper>
      <LazyLoad offsetVertical={0}>
        <img src={cover} alt={title} width="150" height="220" />
      </LazyLoad>
    </CoverWrapper>
  )
}

const Stars: FC<StarsProps> = ({ rating }) => {
  const half = Math.round(rating / 2)
  const starred = Array.from({ length: 5 }).map((_, i) => i < half)

  return (
    <StarsWrapper>
      {starred.map((starred, index) => (
        <StarIcon key={index} starred={starred} />
      ))}
    </StarsWrapper>
  )
}

const MovieItem: FC<MovieItemProps> = ({ item }) => {
  return (
    <Item>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href={item.linkUrl} target="_blank">
        <Cover cover={item.cover} title={item.title} />
        <Title>{item.title}</Title>
        <Rating>
          <Stars rating={Number(item.rating)} />
          <RatingNumber>{item.rating}</RatingNumber>
        </Rating>
      </a>
    </Item>
  )
}

const CoverWrapper = styled.div`
  position: relative;
  min-height: 87px;
  overflow: hidden;
  color: transparent;
  background-color: ${props => props.theme.bg};
  transition: all 0.3s ease;

  &:before {
    content: '';
    display: block;
    padding-top: 143%;
  }

  img,
  .LazyLoad {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    border-radius: 0;
    box-shadow: none;
  }

  &:hover {
    box-shadow: 0 1rem 2.1rem rgba(48, 55, 66, 0.3);
  }
`

const StarsWrapper = styled.span`
  display: flex;
  align-items: center;
`

const Item = styled.div`
  width: 16%;
  margin: 0 2% 30px 2%;
  padding: 0;
  font-size: ${props => props.theme.fontSize};

  a {
    text-decoration: none;
    color: ${props => props.theme.dark};
  }
`

const Title = styled.div`
  margin-top: 12px;
  line-height: 1.3;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  min-height: 16px;
  line-height: 1;
`

const RatingNumber = styled.span`
  margin-left: 5px;
  color: ${props => props.theme.gray};
  font-size: ${props => props.theme.ratingFontSize};
`

export default MovieItem
