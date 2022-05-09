import React from 'react'
import styled from 'styled-components'
import dao from '../assets/image/Dao.png'

const Image = (props) => {
  const { shape, src, size, margin } = props

  const styles = {
    shape,
    src:
      src === ''
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sheep%2C_Stodmarsh_6.jpg/911px-Sheep%2C_Stodmarsh_6.jpg'
        : src,
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
  src:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sheep%2C_Stodmarsh_6.jpg/911px-Sheep%2C_Stodmarsh_6.jpg',
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
