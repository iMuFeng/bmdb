import { FC } from 'react'
import styled from 'styled-components'

interface StarIconProps {
  starred?: boolean
}

const StarIcon: FC<StarIconProps> = ({ starred = false }) => {
  return (
    <StarIconWrapper starred={starred} viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"
      />
    </StarIconWrapper>
  )
}

const StarIconWrapper = styled.svg<{
  starred?: boolean
}>`
  margin-right: 1px;
  width: 12px;
  height: 12px;
  color: ${props => props.theme.bg};

  ${props => props.starred && `color: ${props.theme.highlight}`};
`

export default StarIcon
