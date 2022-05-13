import React from 'react'
import { history } from '../redux/configureStore'
import { Grid, Text, DotButton } from '../element/index'
import banner from '../assets/image/game/메인_배너.png'
import styled from 'styled-components'

const TutorialBanner = () => {
  return (
    <>
      <Container>
        <Banner src={banner} />

        <Box>
          <Text margin="5px" size="40px">
            MAFIYANG
          </Text>
          <P>
            양들이 풀을 뜯어먹는 평화로운 양양마을
            <br />
            그러나 밤마다 양이 하나둘 씩 사라진다는데...
            <br />
            무슨 일이 일어나는 걸까?
            <br />
            마피양의 역할을 확인해보세요!
          </P>
          <DotButton
            text="보러가기"
            _onClick={() => history.push('/introduce')}
          />
        </Box>
      </Container>
    </>
  )
}

const Container = styled.div`
  position: relative;
  margin: 30px auto;
`

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
`
const P = styled.p`
  color: #61ff00;
  font-size: 18px;
  text-shadow: 2px 2px black, 2px 2px black, 2px 2px black, 2px -1px black;
`

const Banner = styled.img`
  max-width: 100%;
`

export default TutorialBanner
