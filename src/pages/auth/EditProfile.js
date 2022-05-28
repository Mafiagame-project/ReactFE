import React, { useRef } from 'react'
import { history } from '../../redux/configureStore'
import { actionCreators as userActions } from '../../redux/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Text, Grid, DotButton, Image } from '../../element/index'
import edit from '../../assets/icons/white/edit_w.png'
import EditProfileModal from '../../component/modal/EditProfileModal'
import 마피양 from '../../assets/image/character/profile.jpg'
import 기자 from '../../assets/image/character/양_기자.png'
import 경찰 from '../../assets/image/character/경찰.png'
import 의사 from '../../assets/image/character/의사_양.png'
import { clickSF, deniedSF } from '../../element/Sound'
import edit_b from '../../assets/icons/black/중복확인.png'

const EditProfile = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const profileIdx = useSelector((state) => state.member.idx)
  const socket = useSelector((state) => state.game.socket)
  const pictures = [마피양, 기자, 경찰, 의사]
  const nickName = useRef()

  window.onbeforeunload = function () {
    return dispatch(userActions.logOutDB())
  }

  const doubleNickCheck = () => {
    const changeNick = nickName.current.value
    if (changeNick === '') {
      deniedSF.play()
      alert('닉네임을 입력하세요!')
      return
    } else {
      clickSF.play()
      dispatch(userActions.nickCheck(changeNick))
    }
  }

  const changeNickHandler = () => {
    const changeNick = nickName.current.value
    if (changeNick.length > 6) {
      deniedSF.play()
      alert('닉네임은 6자 이하로 작성해주세요!')
      return
    }
    if (changeNick === '') {
      deniedSF.play()
      alert('닉네임을 입력하세요!')
    } else {
      socket.emit('main', changeNick)
      dispatch(userActions.changeNickDB(changeNick))
    }
  }
  return (
    <>
      <Background>
        <Container>
          <Text size="70px">MAFIYANG</Text>
          <Grid margin="40px auto 5px">
            <ImgOverlay
              onClick={() => {
                setIsOpen(true)
                clickSF.play()
              }}
            >
              <Image size="140" margin="30px auto" src={pictures[profileIdx]} />
              <Overlay className="event">
                <Image small size="140" src={edit} classNmae="icon" />
              </Overlay>
            </ImgOverlay>
            <Grid isFlex_center>
              <TitleInput ref={nickName} auth placeholder="변경할 닉네임" />
              <img src={edit_b} alt="중복확인" onClick={doubleNickCheck} />
            </Grid>
          </Grid>
          <Grid isFlex_center>
            <DotButton
              white01
              text="취소"
              _onClick={() => {
                history.push('/gamemain')
                clickSF.play()
              }}
            />
            <DotButton
              black01
              text="닉네임저장"
              _onClick={() => {
                changeNickHandler()
              }}
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
const TitleInput = styled.input`
  width: 55%;
  height: 35px;
  padding: 10px;
  font-size: 24px;
  background-color: #f6f6f6;
  border: 1px solid #c4c4c4;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: #c4c4c4;
    text-align: center;
  }
`
export default EditProfile
