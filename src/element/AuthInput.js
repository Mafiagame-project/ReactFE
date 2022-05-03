import React from 'react'
import styled from 'styled-components'

const AuthInput = (props) => {
  const {
    size,
    padding,
    margin,
    placeholder,
    label,
    _onChange,
    type,
    id,
    autoComplete,
    width,
    bg,
  } = props

  const styles = {
    size: size,
    margin: margin,
    padding: padding,
    placeholder: placeholder,
    width: width,
    bg: bg,
  }

  return (
    <React.Fragment>
      <Label>{label}</Label>
      <ElInput
        {...styles}
        id={id}
        onChange={_onChange}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </React.Fragment>
  )
}

AuthInput.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: '텍스트를 입력해주세요.',
  type: 'text',
  value: '',
  id: '',
  autoComplete: 'off',
  width: '',
  bg: '',
  _onChange: () => {},
}

const ElInput = styled.input`
  margin: 4px;
  padding: 8px;
  ${(props) => (props.width ? `width: ${props.width};` : `width: 333px`)};
  ${(props) =>
    props.bg ? `background-color: ${props.bg};` : `background-color: #F6F6F6`};
  height: 48px;
  font-size: 20px;
  color: #333;
  border: 1px solid #c4c4c4;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: #c4c4c4;
    text-align: center;
  }
`

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`
export default AuthInput
