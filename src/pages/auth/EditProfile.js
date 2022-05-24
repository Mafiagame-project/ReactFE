import React, { useRef } from 'react'
import Header from '../../component/Header'
import { history } from '../../redux/configureStore'
import { Text, Grid, DotButton, Image, Input } from '../../element/index'
import styled from 'styled-components'
import edit from '../../assets/icons/white/edit_w.png'
import EditProfileModal from '../../component/modal/EditProfileModal'
import { actionCreators as memberActions } from '../../redux/modules/member'
import { actionCreators as userActions } from '../../redux/modules/user'
import 마피양 from '../../assets/image/character/profile.jpg'
import 기자 from '../../assets/image/character/양_기자.png'
import 경찰 from '../../assets/image/character/경찰.png'
import 의사 from '../../assets/image/character/의사_양.png'
import pop from '../../assets/sound/effect/pop02.mp3'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const EditProfile = () => {
  const dispatch = useDispatch()
  const userId = localStorage.getItem('userId')
  const [isOpen, setIsOpen] = React.useState(false)
  const profileIdx = useSelector((state) => state.member.idx)
  const pictures = [마피양, 기자, 경찰, 의사]
  const nickName = useRef()

  const click = new Audio(pop)
  window.onbeforeunload = function () {
    return dispatch(userActions.logOutDB())
};

  const changeNick = () => {
    const changeNick = nickName.current.value
    if (changeNick.length > 10) {
      return
    } else {
      axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { changeNick },
        url: 'https://sparta-dongsun.shop/user/changeNick',
      })
        .then((response) => {
          alert('변경이 완료되었습니다')
          localStorage.getItem('userNick', response.data.userNick)
          dispatch(memberActions.changeNick(response.data?.userNick))
        })
        .catch((error) => {
          console.log(error)
        })
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
                click.play()
              }}
            >
              <Image size="140" margin="30px auto" src={pictures[profileIdx]} />
              <Overlay className="event">
                <Image small size="140" src={edit} classNmae="icon" />
              </Overlay>
            </ImgOverlay>
            <TitleInput ref={nickName} auth placeholder="변경할 닉네임" />
          </Grid>
          <Grid isFlex_center>
            <DotButton
              white01
              text="취소"
              _onClick={() => {
                history.push('/gamemain')
                click.play()
              }}
            />
            <DotButton
              black01
              text="저장"
              _onClick={() => {
                history.push('/gamemain')
                changeNick()
                click.play()
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
  width: 65%;
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
