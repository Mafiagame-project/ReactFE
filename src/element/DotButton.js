import React from 'react'
import blackBtn01 from '../assets/button/black/01.png'
import blackBtn02 from '../assets/button/black/02.png'
import blackBtn03 from '../assets/button/black/03.png'
import blackBtn04 from '../assets/button/black/04.png'
import whiteBtn01 from '../assets/button/white/01.png'
import whiteBtn02 from '../assets/button/white/02.png'
import whiteBtn03 from '../assets/button/white/03.png'
import whiteBtn04 from '../assets/button/white/04.png'
import twoBtn from '../assets/button/00.png'
import styled from 'styled-components'

const DotButton = (props) => {
  const {
    text,
    type,
    _onClick,
    black01,
    black02,
    black03,
    black04,
    white01,
    white02,
    white03,
    white04,
  } = props

  if (black01) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn01} />
          <button type={type} style={{ display: 'none ' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }

  if (black02) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn02} />
          <button type={type} style={{ display: 'none' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }
  if (black03) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn03} />
          <button type={type} style={{ display: 'none' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }
  if (black04) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn04} />
          <button type={type} style={{ display: 'none' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }

  if (white01) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn01} />
          <button type={type} style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }
  if (white02) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn02} />
          <button type={type} style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }
  if (white03) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn03} />
          <button type={type} style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }
  if (white04) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn04} />
          <button type={type} style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }

  return (
    <>
      <ButtonBox onClick={_onClick}>
        <img src={twoBtn} />
        <button type={type} style={{ display: 'none' }} />
        <BlackText>{text}</BlackText>
      </ButtonBox>
    </>
  )
}

export default DotButton

DotButton.defaultProps = {
  text: '',
  type: '',
  _onClick: () => {},
}

const ButtonBox = styled.div`
  cursor: pointer;
  position: relative;
  text-align: center;
`

const WhiteText = styled.div`
  color: #fff;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  font-size: 25px;
  transform: translate(-50%, -50%);
`
const BlackText = styled.div`
  color: #000;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  font-size: 25px;
  transform: translate(-50%, -50%);
`
