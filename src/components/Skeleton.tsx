import { useAppOption } from '@/hooks'
import styled, { css, keyframes } from 'styled-components'
import { ListWrapper } from './MovieList'

const Skeleton = () => {
  const option = useAppOption()
  const length = option.isMobile ? 3 : 5
  const skeletons = Array.from({ length })

  return (
    <ListWrapper isMobile={option.isMobile}>
      {skeletons.map((_, index) => (
        <SkeletonItem key={index}>
          <Cover />
          <Title />
          <Rating />
        </SkeletonItem>
      ))}
    </ListWrapper>
  )
}

const loading = keyframes`
  0% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
`

const animationCss = css`
  background-image: linear-gradient(
    90deg,
    ${props => props.theme.bg} 25%,
    ${props => props.theme.bgDark} 37%,
    ${props => props.theme.bg} 63%
  );
  background-size: 400% 100%;
  animation: ${loading} 1.2s ease infinite;
`

const SkeletonItem = styled.div`
  width: 16%;
  margin: 0 2% 24px 2%;
`

const Cover = styled.div`
  ${animationCss};
  position: relative;
  min-height: 87px;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    padding-top: 143%;
  }
`

const Title = styled.div`
  ${animationCss};
  margin-top: 10px;
  width: 80px;
  height: 18px;
`

const Rating = styled.div`
  ${animationCss};
  margin-top: 4px;
  width: 110px;
  height: 12px;
`

export default Skeleton
