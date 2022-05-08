import React from 'react'
import styled from 'styled-components'

const Input = (props) => {
  const {
    size,
    padding,
    margin,
    placeholder,
    label,
    type,
    id,
    width,
    height,
    _onChange,
    _onKeyDown,
  } = props

  const styles = {
    size: size,
    margin: margin,
    padding: padding,
    height: height,
    width: width,
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            _onKeyDown()
          }
        }}
      />
    </React.Fragment>
  )
}

export default Input

Input.defaultProps = {
  multiLine: false,
  label: false,
  width: '100%',
  placeholder: '텍스트를 입력해주세요.',
  type: 'text',
  value: '',
  id: '',
  _onChange: () => {},
  _onKeyDown: () => {},
  margin: '',
  padding: '',
  height: '',
}

const ElInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : '')};
  padding: ${(props) => props.padding};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  font-size: 20px;
  color: #333;
  border: 1px solid #c4c4c4;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: #c4c4c4;
  }
`

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`
