import React from 'react'
import Peer from 'peerjs'
import ModalPortal from './ModalPortal'
import { Grid, Text, Input, Button } from '../../element/index'
import { actionCreators as roomActions } from '../../redux/modules/room'
import { actionCreators as gameActions } from '../../redux/modules/game'
import { history } from '../../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Slider } from '@mui/material'
import styled from 'styled-components'

const CreateRoomModal = ({ onClose, socket }) => {
  const dispatch = useDispatch()
  const [getOpen, setOpen] = React.useState()
  const [getPeople, setPeople] = React.useState()
  const title = React.useRef()
  const people = React.useRef()
  const pwd = React.useRef()

  React.useEffect(() => {}, [socket])
  const createRoom = () => {
    let roomTitle = title.current.value
    let roomPeople = getPeople
    let roomPwd
    if (getOpen == false) {
      // 비공개방일때
      roomPwd = pwd.current.value
      socket.emit('createRoom', { roomTitle, roomPeople, roomPwd })
    } else {
      // 공개방일때
      socket.emit('createRoom', { roomTitle, roomPeople })
    }
    socket.emit('roomList')
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })
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
          <Button _onClick={() => onClose()} bg="#fff">
            X
          </Button>
          <Text size="50px">새로운 방 만들기</Text>
          <Grid>
            <Text size="25px">방 제목</Text>
            <TitleInput
              ref={title}
              placeholder="방 이름을 입력하세요. (최대 n글자)"
            />
          </Grid>
          <Grid>
            <Text size="25px">인원 수</Text>
            <Grid width="50%">
              <Slider
                aria-label="time-indicator"
                defaultValue={5}
                max={10}
                min={4}
                step={1}
                valueLabelDisplay="on"
                size="big"
                onChange={(e) => {
                  setPeople(e.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Grid>
            <Text size="25px">시크릿 설정</Text>
            <Button _onClick={toggleSecret}>시크릿 모드 ON</Button>

            {getOpen == false ? (
              <input
                ref={pwd}
                style={{
                  border: '1px solid #d2d2d2',
                  borderRadius: '20px',
                  background: '#eee',
                  padding: '10px',
                  marginLeft: '10%',
                  height: '15px',
                }}
                placeholder="방 비밀번호 입력"
              />
            ) : null}
            <Grid>
              <Button
                _onClick={() => {
                  createRoom()
                }}
              >
                방 만들기 완료
              </Button>
            </Grid>
          </Grid>
        </Content>
      </Background>
    </ModalPortal>
  )
}
const TitleInput = styled.input`
  width: 710px;
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
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 30px;
  height: 600px;
  max-width: 800px;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`

export default CreateRoomModal
