import React from 'react'
import styled from 'styled-components'
import notfound from '../assets/image/page/notfound.jpg'

const NotFound = () => {
  return <Container></Container>
}

export default NotFound

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${notfound});
  background-repeat: no-repeat;
  background-size: contain;
  overflow: hidden;
  background-color: #fff;
`
