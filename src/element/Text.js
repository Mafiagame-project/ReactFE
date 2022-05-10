import React from 'react'
import styled from 'styled-components'

const Text = (props) => {
  const { bold, color, size, children, margin, font, _onClick, center } = props

  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin,
    font: font,
    center: center,
  }
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  )
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '',
  margin: false,
  font: false,
  center: false,
  _onClick: () => {},
}

const P = styled.p`
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.center ? `text-align:center;` : '')}
`

export default Text
