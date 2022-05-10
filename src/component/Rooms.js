import React from 'react'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as gameActions } from '../redux/modules/game'
import { history } from '../redux/configureStore'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Text, Button } from '../element/index'
import styled from 'styled-components'
import Peer from 'peerjs'

const Rooms = (props) => {
  const dispatch = useDispatch()
  const RoomList = useSelector((state) => state.room.rooms)
  const socket = useSelector((state) => state.game.socket)
  const currentId = localStorage.getItem('userId')
  const myPeer = new Peer()

  const entrance = (roomInfo) => {
    let roomId = roomInfo.roomId
    // 방에 입장시 생기는 이벤트
    if (roomInfo.start == true) {
      alert('게임이 시작되었습니다')
      return
    } else {
      if (roomInfo.currentPeople.length >= parseInt(roomInfo.roomPeople)) {
        alert('정원이 꽉찼습니다')
        return
      } else {
        if (roomInfo.password) {
          let pwdInput = prompt('비밀번호를 입력해주세요')
          if (pwdInput == parseInt(roomInfo.password)) {
            history.push(`/gameroom/${roomId}`)
            dispatch(gameActions.sendSocket(socket))
            dispatch(roomActions.currentRoom(roomInfo))
            dispatch(gameActions.sendPeerId(myPeer.id))
              socket.emit('joinRoom', roomId, myPeer.id)
          } else {
            alert('비밀번호가 틀림 ㅋ')
            return null
          }
        } else {
          history.push(`/gameroom/${roomId}`)
          dispatch(gameActions.sendSocket(socket))
          dispatch(roomActions.currentRoom(roomInfo))
          dispatch(gameActions.sendPeerId(myPeer.id))
            socket.emit('joinRoom', roomId, myPeer.id)
        }
      }
    }
  }
  React.useEffect(() => {
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })
    return () => {
      socket.off('roomList') // 소켓 꺼놨슴요
    }
  }, [socket])
  React.useEffect(() => {
    socket.emit('roomList')
    socket.emit('main', currentId)
  }, [socket])

  return (
    <>
      <Grid>
        <Grid padding="30px">
          <Grid is_flex height="10%" padding="10px">
            <Text size="25px" bold>
              전체 방 목록
            </Text>
          </Grid>
          <RoomBox>
            {RoomList.map((room, i) => {
              return (
                <Room
                  key={i}
                  onClick={() => {
                    entrance(room)
                  }}
                >
                  <Grid center height="15%">
                    <Text color="white">MAFIYANG</Text>
                  </Grid>
                  <Grid
                    padding="20px 60px 20px 60px"
                    center
                    bg="white"
                    height="100%"
                  >
                    <Text size="30px" bold>
                      {room.roomTitle}
                    </Text>
                    <Text size="15px" bold>
                      방장 : {room.userId}
                    </Text>
                    <Grid border isFlex_center height="40px" bg="black">
                      <Text color="white" size="20px" bold>
                        {room.currentPeople.length} / {room.roomPeople}
                      </Text>
                    </Grid>
                  </Grid>
                </Room>
              )
            })}
          </RoomBox>
        </Grid>
      </Grid>
    </>
  )
}

const RoomBox = styled.div`
  width: 95%;
  height: 60%;
  padding: 30px 50px 30px 10px;
  overflow-x: scroll;
  display: flex;
  flex-direction: columns;
  @media screen and (max-width: 600px) {
    height: 100%;
    flex-direction: column;
  }
`

const Room = styled.div`
  width: 300px;
  min-width: 300px;
  height: 386px;
  background-color: black;
  border: 1px solid black;
  border-radius: 20px 20px 0px 0px;
  margin-right: 20px;
  box-shadow: 3px 3px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 1) 10px 10px;
  }
`

export default Rooms
