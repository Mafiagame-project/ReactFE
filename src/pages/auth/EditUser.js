import React from 'react'
import Header from '../../component/Header'
import { history } from '../../redux/configureStore'
import { Text, Grid, DotButton, Image } from '../../element/index'
import styled, { createGlobalStyle } from 'styled-components'

const EditUser = () => {
  const userId = localStorage.getItem('userId')

  return (
    <>
      <Background>
        <Container>
          <Text size="70px">MAFIYANG</Text>
          <Grid isFlex_center width="300px" margin="50px auto">
            <Image size="140" />
            <Grid isStart margin="0 0 0 40px">
              <Text size="25px">{userId}</Text>
              <Text size="20px">99승 99패</Text>
            </Grid>
          </Grid>
          <Grid center>
            <DotButton
              black03
              text="프로필 변경"
              _onClick={() => history.push('/editprofile')}
            />
          </Grid>
        </Container>
      </Background>
    </>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: #fff;
`

const Container = styled.div`
  position: fixed;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 10;
  height: 400px;
  max-width: 500px;
  width: 100%;
  position: relative;
`

export default EditUser
