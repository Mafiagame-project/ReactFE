import React from 'react'
import { history } from '../../redux/configureStore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Text, Grid, DotButton, Image } from '../../element/index'
import 마피양 from '../../assets/image/character/profile.jpg'
import 기자 from '../../assets/image/character/양_기자.png'
import 경찰 from '../../assets/image/character/경찰.png'
import 의사 from '../../assets/image/character/의사_양.png'
import { clickSF } from '../../element/Sound'

const EditUser = () => {
  const profileIdx = useSelector((state) => state.member.idx)
  const recordWin = useSelector((state) => state.member.win)
  const recordLose = useSelector((state) => state.member.lose)
  const userNick = useSelector((state) => state.user.userNick)
  const pictures = [마피양, 기자, 경찰, 의사]

  return (
    <>
      <Background>
        <Container>
          <Text size="70px">MAFIYANG</Text>
          <Grid isFlex_center width="300px" margin="50px auto">
            <Image size="140" src={pictures[profileIdx]} />
            <Grid isStart margin="0 0 0 40px">
              <Text size="25px">{userNick}</Text>
              <Text size="20px">
                {recordWin}승 {recordLose}패
              </Text>
            </Grid>
          </Grid>
          <Grid center>
            <DotButton
              black03
              text="프로필 변경"
              _onClick={() => {
                history.push('/editprofile')
                clickSF.play()
              }}
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
