import React from 'react'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as gameActions } from '../redux/modules/game'
import { history } from '../redux/configureStore'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'
import sheep from '../assets/image/character/양_시민.png'
import reload from '../assets/icons/black/새로고침.png'
import { clickSF, accessSF, deniedSF } from '../element/Sound'
const Rooms = () => {
  const dispatch = useDispatch()
  const RoomList = useSelector((state) => state.room.rooms)
  const socket = useSelector((state) => state.game.socket)
  const currentId = localStorage.getItem('userNick')

  const entrance = (roomInfo) => {
    let roomId = roomInfo.roomId
    let peopleArray = roomInfo.currentPeople

    if (peopleArray.includes(currentId)) {
      deniedSF.play()
      alert('중복 입장은 불가능합니다!')
      return
    }
    if (roomInfo.start === true) {
      alert('게임이 시작되었습니다')
      deniedSF.play()
      return
    } else {
      if (roomInfo.currentPeople.length >= parseInt(roomInfo.roomPeople)) {
        deniedSF.play()
        alert('정원이 꽉찼습니다')
        return
      } else {
        if (roomInfo.password) {
          clickSF.play()
          let pwdInput = prompt('비밀번호를 입력해주세요')

          if (pwdInput == parseInt(roomInfo.password)) {
            history.push(`/gameroom/${roomId}`)
            dispatch(gameActions.sendSocket(socket))
            dispatch(roomActions.currentRoom(roomInfo))
            socket.emit('joinRoom', roomId)
            accessSF.play()
          } else {
            deniedSF.play()
            alert('비밀번호가 틀림 ㅋ')
            return null
          }
        } else {
          history.replace(`/gameroom/${roomId}`)
          dispatch(gameActions.sendSocket(socket))
          dispatch(roomActions.currentRoom(roomInfo))
          socket.emit('joinRoom', roomId)
          accessSF.play()
        }
      }
    }
  }

  const roomReload = () => {
    clickSF.play()
    socket.emit('roomList')
  }
  
  React.useEffect(() => {
    socket.emit('main', currentId)
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })
    return () => {
      socket.off('roomList')
      socket.off('joinRoom')
      socket.removeAllListeners('joinRoom')
    }
  }, [socket])

 

  return (
    <>
      <Grid width="90%">
        <Grid padding="30px 0">
          <Grid is_flex height="10%" padding="10px" margin="0 1vw">
            <Title>
              <Text size="25px">방 전체 목록</Text>
            </Title>
            <Grid _cursor _onClick={roomReload} margin="0 1vw">
              <img src={reload} alt="새로고침" />
            </Grid>
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
                  <Grid center height="10%">
                    <Text margin="0.4vh 0" color="white">
                      MAFIYANG
                    </Text>
                  </Grid>
                  <Grid
                    padding="50px 60px 20px"
                    center
                    bg="white"
                    height="100%"
                    flexColumn
                  >
                    <Text size="30px" bold>
                      {room.roomTitle}
                    </Text>
                    <Grid>
                      <Text size="18px">방장 : {room.userId}</Text>

                      <Grid
                        width=""
                        isFlex_center
                        center
                        bg="black"
                        border
                        margin="10px 30px"
                      >
                        <img src={sheep} alt="양" style={{ width: '28px' }} />
                        <Text color="#fff" size="22px" margin="13px">
                          {room.currentPeople.length}/{room.roomPeople}
                        </Text>
                      </Grid>
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

const Title = styled.div`
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  text-align: center;
  width: 200px;
  padding: 0.6vw;
  margin: 0 0 1vh;
`

const RoomBox = styled.div`
  height: 60%;
  overflow-x: scroll;
  display: flex;
  flex-direction: columns;
  @media screen and (max-width: 600px) {
    height: 100%;
    flex-direction: column;
  }
`

const Room = styled.div`
  cursor: pointer;
  min-width: 305px;
  height: 350px;
  background-color: black;
  border: 4px solid black;
  border-radius: 20px 20px 0px 0px;
  margin: 0 30px 25px 0;
  box-shadow: 3px 3px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 1) 10px 10px;
  }
`

export default Rooms
