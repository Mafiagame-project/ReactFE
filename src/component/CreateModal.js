import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Grid, Text, Input, Button } from '../element/index'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as gameActions } from '../redux/modules/game'
import Peer from 'peerjs';
import { Slider } from '@mui/material'

function CreateModal(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const getModal = props.getModal;
  const setModal = props.setModal;
  const socket = props.socket;
  const [getOpen, setOpen] = useState();
  const [getPeople, setPeople] = useState();
  const title = useRef();
  const people = useRef();
  const pwd = useRef();
  const Btn1 = styled.button`
    width: 100px;
    border: none;
    border-radius: 20px;
    height: 40px;
    background: ${getOpen == true ? 'black' : '#eee'};
    color:${getOpen == true ? 'white' : 'black'};
    margin-right: 10px;
  `
  const Btn2 = styled.button`
    width: 100px;
    border: none;
    border-radius: 20px;
    height: 40px;
    background: ${getOpen == false ? 'black' : '#eee'};
    color:${getOpen == false ? 'white' : 'black'};
  `
  useEffect(() => {}, [socket])
  const createRoom = () => {
    let roomTitle = title.current.value
    let roomPeople = getPeople;
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
  return (
    <Modalblack>
      <Modalwhite>
        <Grid is_flex height="30px">
          <div></div>
          <Button
            width="50px"
            _onClick={() => {
              setModal(!getModal)
            }}
          >
            X
          </Button>
        </Grid>
        <Grid height="100px">
          <Text bold size="25px">
            방 만들기
          </Text>
        </Grid>
        <Grid is_flex width="70%" height="70px" padding="50px">
          <Text size="20px" bold>
            방 제목
          </Text>
          <input
            ref={title}
            style={{
              width: '70%',
              fontSize: '18px',
              borderRadius: '10px',
              border: '1px solid #d2d2d2',
              height: '40px',
            }}
          />
        </Grid>
        <Grid is_flex width="70%" height="70px" padding="50px">
          <Grid width='150px' height='70px'>
            <Text size="20px" bold>
              인원 수
            </Text>
          </Grid>
          <Grid margin='0 50px 0 50px' height='30px'>
          <Slider aria-label="time-indicator"
            defaultValue={5}
            max={10}
            min={4}
            step={1}
            valueLabelDisplay="on"
            size='big'
            onChange={(e)=>{setPeople(e.target.value)}} />
            </Grid>
        </Grid>
        <Grid isFlex_start width="80%" height="100px" padding="50px">
          <Btn1
            onClick={() => {
              setOpen(true)
            }}
          >
            공개
          </Btn1>
          <Btn2
            onClick={() => {
              setOpen(false)
            }}
          >
            비공개
          </Btn2>
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
        </Grid>
        <Grid>
          <Button
            bg="black"
            size="20px"
            padding="px 20px 0px 20px"
            _onClick={() => {
              createRoom()
            }}
          >
            <Text size='15px' color='white' bold>생성하기</Text>
          </Button>
        </Grid>
      </Modalwhite>
    </Modalblack>
  )
}
export const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 5;
`
export const Modalwhite = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 40%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
`
export default CreateModal
