import React from 'react'
import styled from 'styled-components'
import mobileimg from '../assets/image/page/mobile.jpg'

const MobilePage = () => {
  return (
    <Background>
      <Page src={mobileimg}></Page>
    </Background>
  )
}

export default MobilePage

const Background = styled.div`
  background-color: #171917;
`
const Page = styled.img`
  width: 390px;
  hieght: 2107px;
  display: block;
  margin: auto;
`
