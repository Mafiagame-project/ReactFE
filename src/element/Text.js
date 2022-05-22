import React from 'react'
import styled from 'styled-components'

const Text = (props) => {
  const { children, _onClick, ...styles } = props

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
  left: false,
  right: false,
  _cursor: false,
  _onClick: () => {},
}

const P = styled.p`
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.center ? `text-align:center;` : '')}
  ${(props) => (props.left ? `text-align:left;` : '')}
  ${(props) => (props.right ? `text-align:right;` : '')}
  ${(props) => (props._cursor ? `cursor: pointer;` : null)};
`

export default Text
