import React from 'react'
import Header from '../component/Header'
import { Grid, Text, Button } from '../element/index'
import styled from 'styled-components'
import data from '../shared/introduce'

function Introduce() {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleBtn = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Header />
      <Grid center padding="50px">
        <Text size="40px">역할 튜토리얼</Text>
        <Text bold size="16px" margin="0 0 30px 0">
          역할을 선택해주세요
        </Text>
        <CardBox>
          {data.map((e) => {
            return (
              <Card>
                <Grid center height="10%">
                  <Text color="white">MAFIYANG</Text>
                </Grid>
                <Grid
                  padding="20px 60px 20px 60px"
                  center
                  bg="white"
                  height="100%"
                  _onlick={toggleBtn}
                >
                  <Img src={e.img} />
                  <Grid bg="#000">
                    <Text color="#fff">{e.title}</Text>
                  </Grid>
                </Grid>
              </Card>
            )
          })}
        </CardBox>
        {/* <Grid margin="20px 0 0 0" padding="30px" height="40%"></Grid> */}
      </Grid>
    </>
  )
}

const Img = styled.img`
  width: 100px;
`
const CardBox = styled.div`
  width: 95%;
  margin: 0 auto;
  overflow-x: scroll;
  display: flex;
  flex-direction: columns;
`

const Card = styled.div`
  box-sizing: border-box;
  width: 300px;
  min-width: 300px;
  height: 386px;
  background-color: black;
  border: 1.5px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover {
    border: 5px solid black;
  }
`
export default Introduce
