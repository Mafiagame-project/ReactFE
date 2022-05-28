import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/configureStore'
import { Text, DotButton } from '../element/index'
import bannerGif from '../assets/image/game/배너.gif'
import pop02 from '../assets/sound/effect/pop02.mp3'

const TutorialBanner = () => {
  const click = new Audio(pop02)

  return (
    <Container>
      <Banner src={bannerGif} />
      <Box>
        <Text margin="5px" size="3vw">
          MAFIYANG
        </Text>
        <P>
          양들이 풀을 뜯어 먹는 평화로운 양양 마을
          <br />
          그러나 밤마다 양이 하나둘씩 사라진다는데...
          <br />
          무슨 일이 일어나는 걸까?
          <br />
          마피양의 역할을 확인해 보세요!
        </P>
        <DotButton
          text="보러가기"
          _onClick={() => {
            history.push('/introduce')
            click.play()
          }}
        />
      </Box>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
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
  font-size: 1.8vw;
  text-shadow: 2px 2px black, 2px 2px black, 2px 2px black, 2px -1px black;
`

const Banner = styled.img`
  width: 100%;
`

export default TutorialBanner
