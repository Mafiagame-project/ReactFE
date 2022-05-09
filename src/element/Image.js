import React from 'react'
import styled from 'styled-components'
import sheep from '../assets/image/character/양_시민.png'

const Image = (props) => {
  const { shape, src, size, margin } = props

  const styles = {
    shape,
    src: src === '' ? sheep : src,
    size,
    margin,
  }

  return (
    <div>
      <ImageCircle {...styles}></ImageCircle>
    </div>
  )
}

Image.defaultProps = {
  shape: 'circle',
  src: sheep,
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

export default Image
