import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as roomActions } from '../../redux/modules/room'
import styled from 'styled-components'
import { Slider } from '@mui/material'
import { withStyles } from '@mui/styles'
import ModalPortal from './ModalPortal'
import { Grid, Text, DotButton } from '../../element/index'
import closeIcon from '../../assets/icons/black/닫기.png'
import sheep from '../../assets/image/character/양_시민.png'
import { clickSF, accessSF, deniedSF } from '../../element/Sound'

// 게임룸 만들때 생기는 모달창 컴포넌트
const ImageSlider = withStyles({
  thumb: {
    width: 45,
    height: 45,
    backgroundImage: `url(${sheep})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    borderRadius: 0,
    '&:before': {
      width: 0,
    },
  },
  track: {
    height: 15,
    color: 'black',
    borderRadius: 0,
  },
  rail: {
    color: 'white',
    opacity: 1,
    height: 15,
    border: '1px solid black',
    borderRadius: 0,
  },
})(Slider)

const CreateRoomModal = ({ onClose, socket }) => {
  const dispatch = useDispatch()
  const [getOpen, setOpen] = React.useState(false)
  const [getPeople, setPeople] = React.useState()
  const title = React.useRef()
  const pwd = React.useRef()

  // 방 생성하기 함수
  const createRoom = () => {
    let roomTitle = title.current.value
    let roomPeople = getPeople
    let roomPwd

    if (roomTitle.length > 8) { // 방 이름 8자이하로 제한
      deniedSF.play()
      alert('방 이름은 8자 이하로 적어주세요!')
      return
    }

    if (roomTitle === '') {
      deniedSF.play()
      alert('방 이름을 적어주세요!')
      return null
    }

    if (!roomPeople) {
      roomPeople = 5
    }

    if (getOpen === true) {
      // 비공개방일때 비밀번호를 서버로 보냄
      accessSF.play()
      roomPwd = pwd.current.value
      socket.emit('createRoom', { roomTitle, roomPeople, roomPwd })
      return
    } else {
      // 공개방일때 비밀번호를 제외하고 서버로 보냄
      accessSF.play()
      socket.emit('createRoom', { roomTitle, roomPeople })
    }
    socket.emit('roomList')
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })
    return () => { // 필요없는 소켓 삭제하기
      socket.off('createRoom')
      socket.off('roomList')
    }
  }

  const toggleSecret = () => {
    setOpen(!getOpen)
  }

  return (
    <ModalPortal>
      <Background
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        <Content onClick={(e) => e.stopPropagation()}>
          <img
            src={closeIcon}
            alt="나가기"
            onClick={() => {
              onClose()
              clickSF.play()
            }}
            style={{ float: 'right' }}
          />

          <Text size="3vw" margin="5vw 0 1vw" center>
            새로운 방 만들기
          </Text>

          <FormBox>
            <Grid margin="2.5vw 0 ">
              <Text margin="0.9vh 0" size="1.37em">
                방 제목
              </Text>
              <TitleInput
                ref={title}
                placeholder="방 이름을 입력하세요. (최대 8글자)"
              />
            </Grid>

            <Grid margin="2.5vw 0 ">
              <Text margin="0.3vw 0" size="1.37em">
                인원 수
              </Text>
              <ImageSlider
                aria-label="time-indicator"
                defaultValue={5}
                max={8}
                min={4}
                step={1}
                valueLabelDisplay="on"
                onChange={(e) => {
                  setPeople(e.target.value)
                }}
              />
            </Grid>

            <Grid margin="2.5vw 0 ">
              <Text margin="0.3vw 0" size="1.37em">
                시크릿 설정
              </Text>
              <Grid isFlex_start height="4vh">
                <Grid fs isDisplay="flex">
                  <input
                    id="cb1"
                    type="checkbox"
                    text="시크릿 모드 ON"
                    name="secret"
                    onChange={toggleSecret}
                  />
                  <label htmlFor="cb1"></label>
                  <span>시크릿 모드 ON</span>
                </Grid>
                {getOpen ? (
                  <>
                    <Grid isFlex_start>
                      <Text>비밀번호 설정</Text>
                      <input
                        ref={pwd}
                        style={{
                          border: '1px solid #d2d2d2',
                          background: '#eee',
                          padding: '10px',
                          marginLeft: '4%',
                          height: '15px',
                        }}
                        placeholder="방 비밀번호 입력"
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </FormBox>
          <Grid center>
            <DotButton
              black03
              text="방 만들기 완료"
              _onClick={() => {
                createRoom()
              }}
            />
          </Grid>
        </Content>
      </Background>
    </ModalPortal>
  )
}

const TitleInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 10px;
  background-color: #f6f6f6;
  border: 1px solid #c4c4c4;
  &:focus {
    outline: none;
  }
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
`
const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  height: 75vh;
  max-width: 52vw;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`

const FormBox = styled.div`
  max-width: 33vw;
  width: 100%;
  margin: 0 auto;
`

export default CreateRoomModal
