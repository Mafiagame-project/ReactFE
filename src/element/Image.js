import React from 'react'
import styled from 'styled-components'
import sheep from '../assets/image/character/양_시민.png'
import 마피아 from '../assets/image/character/profile.jpg'
import 기자 from '../assets/image/character/양_기자.png'
import 경찰 from '../assets/image/character/경찰.png'

const Image = (props) => {
  const { shape, src, size, margin, small } = props

  const styles = {
    shape,
    src: src === '' ? sheep : src,
    size,
    margin,
  }
  if (small) {
    return <SmallCircle {...styles}></SmallCircle>
  }

  return (
    <div>
      <ImageCircle {...styles}></ImageCircle>
    </div>
  )
}

Image.defaultProps = {
  shape: 'circle',
  src: 기자,
  size: 100,
  margin: '',
}

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url(${(props) => props.src});
  background-size: cover;
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`
const SmallCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url(${(props) => props.src});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center
    ${(props) => (props.margin ? `margin: ${props.margin};` : null)};
`

export default Image
