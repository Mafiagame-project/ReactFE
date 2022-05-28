import React from 'react'
import styled from 'styled-components'
import sheep from '../assets/image/character/양_시민.png'
import 기자 from '../assets/image/character/profile/profile04.jpeg'

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
