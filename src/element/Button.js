import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  const {
    text,
    _onClick,
    hoverColor,
    hoverbg,
    children,
    margin,
    width,
    padding,
    size,
    bg,
    height,
    type,
    purpleBtn,
    blackBtn,
  } = props

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    size: size,
    bg: bg,
    hoverColor: hoverColor,
    hoverbg: hoverbg,
    height: height,
    purpleBtn: purpleBtn,
    blackBtn: blackBtn,
  }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} type={type}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  )
}

Button.defaultProps = {
  type: '',
  text: false,
  children: null,
  _onClick: () => {},
  margin: false,
  width: '',
  height: '',
  padding: '',
  size: '14px',
  bg: false,
  hoverbg: false,
  purpleBtn: false,
  blackBtn: false,
}

const ElButton = styled.button`  
  font-size: ${(props) => props.size};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  color: ${(props) => props.color};
  ${(props) =>
    props.purpleBtn
      ? `background-color:#B92AFC; color: #fff; font-size: 20px; `
      : ''}
${(props) =>
  props.blackBtn ? `background-color:#333; color: #fff; font-size: 20px; ` : ''}
  color: ${(props) => props.color};
  ${(props) => (props.width ? `width: ${props.width};` : `width: 316px`)};
  ${(props) => (props.height ? `height: ${props.height};` : `height: 51px`)};
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  font-family: ${(props) => props.font};

  font-weight: ${(props) => (props.bold ? '600' : '400')};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  transition: 0.2s;
  
  &:hover {
    color: ${(props) => props.hoverColor};
    ${(props) => (props.hoverbg ? `background-color: ${props.hoverbg};` : '')}
  }
`

export default Button
