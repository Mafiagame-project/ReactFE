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
import signupBtn from '../assets/button/black/signupBtn.png'
import styled from 'styled-components'

const DotButton = (props) => {
  const {
    text,
    _type,
    _onClick,
    black01,
    black02,
    black03,
    black04,
    white01,
    white02,
    white03,
    white04,
    test01,
  } = props

  if (black01) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn01} alt="btn" />
          <button style={{ display: 'none ' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }

  if (black02) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn02} alt="btn" />
          <button style={{ display: 'none' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }
  if (black03) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn03} alt="btn" />
          <button style={{ display: 'none' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }
  if (black04) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={blackBtn04} alt="btn" />
          <button style={{ display: 'none' }} />
          <WhiteText>{text}</WhiteText>
        </ButtonBox>
      </>
    )
  }

  if (white01) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn01} alt="btn" />
          <button style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }
  if (white02) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn02} alt="btn" />
          <button style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }
  if (white03) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn03} alt="btn" />
          <button style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }
  if (white04) {
    return (
      <>
        <ButtonBox onClick={_onClick}>
          <img src={whiteBtn04} alt="btn" />
          <button style={{ display: 'none' }} />
          <BlackText>{text}</BlackText>
        </ButtonBox>
      </>
    )
  }

  if (test01) {
    return (
      <>
        <TestButton type={_type}>
          <img src={signupBtn} alt="btn" />
        </TestButton>
      </>
    )
  }

  return (
    <>
      <ButtonBox onClick={_onClick}>
        <img src={twoBtn} alt="btn" />
        <button type={_type} style={{ display: 'none', width: '140px' }} />
        <TwoBlackText>{text}</TwoBlackText>
      </ButtonBox>
    </>
  )
}

export default DotButton

DotButton.defaultProps = {
  text: '',
  _type: '',
  _onClick: () => {},
}

const TestButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const ButtonBox = styled.div`
  cursor: pointer;
  position: relative;
  text-align: center;
  margin: 10px;
`

const WhiteText = styled.div`
  color: #fff;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  font-size: 25px;
  transform: translate(-50%, -50%);
`
const BlackText = styled.div`
  color: #000;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  font-size: 25px;
  transform: translate(-50%, -50%);
`
const TwoBlackText = styled.div`
  color: #000;
  position: absolute;
  z-index: 10;
  top: 40%;
  left: 50%;
  font-size: 20px;
  transform: translate(-50%, -50%);
`
