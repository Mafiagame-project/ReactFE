import React from 'react'
import styled from 'styled-components'
import sheep from '../assets/image/character/양_시민.png'
import test from '../assets/icons/test.png'

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
    _name,
    radio,
    auth,
    dayRadio,
    autoComplete,
    bg,
    value,
    text,
    display,
    color,
    auth_width,
  } = props

  const styles = {
    size: size,
    margin: margin,
    padding: padding,
    height: height,
    width: width,
    bg: bg,
    auth_width: auth_width,
  }

  const labelStyle = { display, color, size }

  if (auth) {
    return (
      <>
        <Label>{label}</Label>
        <AuthInput
          {...styles}
          id={id}
          onChange={_onChange}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </>
    )
  }

  if (radio) {
    return (
      <RadioBox>
        <RadioLabel {...labelStyle}>
          <RadioInput
            type="radio"
            name={_name}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            {...styles}
          />
          <Img src={sheep} className="sheep" />
          <p>{text}</p>
        </RadioLabel>
      </RadioBox>
    )
  }

  if (dayRadio) {
    return (
      <RadioBox>
        <RadioLabel {...labelStyle}>
          <DayRadioInput
            type="radio"
            name={_name}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            {...styles}
          />

          <Cage src={test} className="cage" />
          <Img src={sheep} className="sheep" />

          <p>{text}</p>
        </RadioLabel>
      </RadioBox>
    )
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
  margin: '',
  padding: '',
  height: '',
  value: '',
  bg: '',
  text: '',
  auth_width: false,
  autoComplete: 'off',
  _onChange: () => {},
  _onKeyDown: () => {},
}

const RadioBox = styled.div`
position: relative;
justify-content: center;
display: flex;
align-items; center;
flex-direction: column;
right: 15%;
`

const RadioLabel = styled.label`
  > p {
    position: absolute;
    display: inline-block;
    color: #fff;
    font-size: 25px;
    margin: 0 0.8vw 0.9vw 0;
    cursor: pointer;
  }
`
const Img = styled.img`
  position: absolute;
  width: 80px;
  top: -90px;
  transition-duration: 0.5s;
  transform: rotate(0);
  z-index: 10;
`

const Cage = styled.img`
opacity: 0;
  position: absolute;
  width: 90px;
  top: -130px;
  transition-duration: 0.5s;
  transform: rotate(0);
  z-index: 20;
  }
`

const RadioInput = styled.input`
  display: none;
  :checked ~ p {
    color: red;
  }
  :checked ~ .sheep {
    transform: rotate(90deg);
  }
`
const DayRadioInput = styled.input`
  display: none;
  :checked ~ p {
    color: red;
  }
  :checked ~ .cage {
    top: -90px;
    opacity: 1;
  }
`
const AuthInput = styled.input`
  margin: 4px;
  padding: 8px;
  width: 332px;
  ${(props) =>
    props.auth_width ? `width: ${props.auth_width};` : `width: 332px`};
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
