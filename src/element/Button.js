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
    chatBtn,
    smallBtn,
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
    chatBtn: chatBtn,
    smallBtn: smallBtn,
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
  chatBtn: false,
  smallBtn: false,
}

const ElButton = styled.button`
  box-sizing: border-box;  
  border: none;
  transition: 0.2s;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  ${(props) => (props.width ? `width: ${props.width};` : `width: 316px`)};
  ${(props) => (props.height ? `height: ${props.height};` : `height: 51px`)};
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  color: ${(props) => props.color};
  ${(props) =>
    props.purpleBtn
      ? `background-color:#B92AFC; color: #fff; font-size: 20px; `
      : ''}
  ${(props) =>
    props.blackBtn
      ? `background-color:#333; color: #fff; font-size: 20px; `
      : ''}

  ${(props) =>
    props.chatBtn
      ? `background-color:#000; color: #fff; font-size: 20px; width: 72px; height: 51px; border-radius:5px; `
      : ''}
      ${(props) =>
        props.smallBtn
          ? `color: #fff; font-size: 20px; width: 165px; height: 60px; margin: 5px;`
          : ''}
  
  &:hover {
    color: ${(props) => props.hoverColor};
    ${(props) => (props.hoverbg ? `background-color: ${props.hoverbg};` : '')}
  }
`

export default Button
