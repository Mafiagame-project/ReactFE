import React from 'react'
import { Grid, Text, Button, Input } from '../element/index'
import styled from 'styled-components'

const Vote = () => {
  const [isNight, setIsNight] = React.useState(false)
  return (
    <>
      <Background>
        {!isNight ? (
          <Container>
            <Text size="40px" color="#fff">
              낮이 되었습니다.
              <br />
              우리에 가둘 양을 선택해 주세요
            </Text>
            <VoteBox>
              <Input dayRadio text="최강마피아" value="vote" _name="vote" />
              <Input dayRadio text="지존마피아" value="vote" _name="vote" />
              <Input dayRadio text="지존마피아" value="vote" _name="vote" />
              <Input dayRadio text="지존마피아" value="vote" _name="vote" />
            </VoteBox>
            <Button>선택완료</Button>
          </Container>
        ) : (
          <Container>
            <Text size="40px" color="#fff">
              밤이 되었습니다.
              <br />
              잡아먹고 싶은 양을 선택해 주세요
            </Text>
            <VoteBox>
              <Input radio text="최강마피아" value="vote" _name="vote" />
              <Input radio text="지존마피아" value="vote" _name="vote" />
              <Input radio text="지존마피아" value="vote" _name="vote" />
              <Input radio text="지존마피아" value="vote" _name="vote" />
            </VoteBox>
            <Button>선택완료</Button>
          </Container>
        )}
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
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`

const Container = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const VoteBox = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  max-width: 600px;
  margin: 100px auto;
`

export default Vote
