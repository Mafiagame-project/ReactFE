import React from 'react'
import Header from '../../component/Header'
import { history } from '../../redux/configureStore'
import { Text, Grid, DotButton, Image, Input } from '../../element/index'
import styled from 'styled-components'
import edit from '../../assets/icons/white/edit_w.png'
import EditProfileModal from '../../component/modal/EditProfileModal'

const EditProfile = () => {
  const userId = localStorage.getItem('userId')
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Background>
        <Container>
          <Text size="70px">MAFIYANG</Text>
          <Grid margin="40px auto 50px">
            <ImgOverlay onClick={() => setIsOpen(true)}>
              <Image size="140" margin="0 auto 10px " />
              <Overlay className="event">
                <Image small size="140" src={edit} classNmae="icon" />
              </Overlay>
            </ImgOverlay>
            <Input auth placeholder="변경할 닉네임" />
          </Grid>
          <Grid isFlex_center>
            <DotButton
              white01
              text="취소"
              _onClick={() => history.push('/gamemain')}
            />
            <DotButton
              black01
              text="저장"
              _onClick={() => history.push('/gamemain')}
            />
          </Grid>
        </Container>
      </Background>
      {isOpen && <EditProfileModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

const ImgOverlay = styled.div`
  position: relative;

  &:hover .event {
    opacity: 1;
  }
`

const Overlay = styled.div`
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
  position: absolute;
  bottom: 0;
  right: 36%;
  opacity: 0;
  border-radius: 70%;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
`

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

export default EditProfile
