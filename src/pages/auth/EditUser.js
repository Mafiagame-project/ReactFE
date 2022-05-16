import React from 'react'
import Header from '../../component/Header'
import { history } from '../../redux/configureStore'
import { Text, Grid, Button, Image } from '../../element/index'
import styled from 'styled-components'

const EditUser = () => {
  const userId = localStorage.getItem('userId')

  return (
    <>
      <Header />
      <Container>
        <Text size="40px">MAFIYANG</Text>
        <Grid isFlex_start>
          <Image size="120" />
          <Grid margin="0 20px">
            <Text size="25px">{userId}</Text>
            <Text size="20px">99승 99패</Text>
          </Grid>
        </Grid>
        <Grid flex_column></Grid>
        <Button blackBtn width="150px">
          확인
        </Button>
        <Button
          blackBtn
          width="150px"
          _onClick={() => history.push('/gamemain')}
        >
          취소
        </Button>
      </Container>
    </>
  )
}

const Container = styled.div`
  max-width: 300px;
  width: 100%;
  text-align: center;
  margin: 100px auto;
`

export default EditUser
