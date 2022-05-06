import Header from '../component/Header'
import styled from 'styled-components'
import { Grid, Text, Input, Button } from '../element/index'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import CreateModal from '../component/CreateModal'
import Peer from 'peerjs'

function Main() {
  const dispatch = useDispatch()
  const RoomList = useSelector((state) => state.room.rooms)
  const socket = useSelector((state) => state.game.socket)
  const currentId = localStorage.getItem('userId')
  const history = useHistory()
  const [getModal, setModal] = useState(false)
  const myPeer = new Peer()

  const entrance = (roomInfo) => {
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
            history.push(`/gameroom/${roomInfo.roomId}`)
            dispatch(gameActions.sendSocket(socket))
            dispatch(roomActions.currentRoom(roomInfo))
            dispatch(gameActions.sendPeerId(myPeer))
            myPeer.on('open', (id) => {
              console.log(id)
              socket.emit('joinRoom', roomInfo.roomId, id)
            })
          } else {
            alert('비밀번호가 틀림 ㅋ')
            return
          }
        } else {
          history.push(`/gameroom/${roomInfo.roomId}`)
          dispatch(gameActions.sendSocket(socket))
          dispatch(roomActions.currentRoom(roomInfo))
          dispatch(gameActions.sendPeerId(myPeer))
          myPeer.on('open', (id) => {
            console.log(id)
            socket.emit('joinRoom', roomInfo.roomId, id)
          })
        }
      }
    }
  }
  console.log(RoomList)
  useEffect(() => {
    socket.emit('main', currentId)
    socket.emit('roomList')
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })
  }, [socket])
  return (
    <>
      <Header />
      {getModal == true ? (
        <CreateModal socket={socket} getModal={getModal} setModal={setModal} />
      ) : null}
      <Container>
        <Grid height='300px' bg="#eee" padding="30px" margin="20px 0 " _onClick={()=>{history.push('/introduce')}}>
          <Text>마피아 게임 룰</Text>
        </Grid>

        <Grid>
          <Grid padding="30px">
            <Grid is_flex height="10%" padding="10px">
              <Text size="25px" bold>
                전체 방 목록
              </Text>
            </Grid>
            <RoomBox>
              {RoomList.map((e) => {
                return (
                  <Room
                    onClick={() => {
                      entrance(e)
                    }}
                  ><Grid center height='15%'>
                      <Text color='white'>MAFIYANG</Text>
                    </Grid> 
                  <Grid padding='20px 60px 20px 60px' center bg='white' height='100%'>
                      <Text size="30px" bold>
                        {e.roomTitle}
                      </Text>
                      <Text size="15px" bold>
                        방장 : {e.userId}
                      </Text>
                      <Grid border isFlex_center height='40px' bg='black'>
                        <Text color='white' size="20px" bold>
                          {e.currentPeople.length} / {e.roomPeople}
                        </Text>
                      </Grid>
                      
                    </Grid>
                  </Room>
                )
              })}
            </RoomBox>
          </Grid>
        </Grid>
        <Grid isFlex_center>
          <Button
            _onClick={() => {
              setModal(!getModal)
            }}
            smallBtn
            hoverbg="purple"
          >
            방 만들기
          </Button>
          <Button
            _onClick={() => {
              setModal(!getModal)
            }}
            smallBtn
            hoverbg="purple"
          >
            입장하기
          </Button>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 80%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
  border:1px solid black;
  border-radius: 50px 50px 0px 0px;
  margin-right: 20px;
  box-shadow: 3px 3px 1px 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover{  
    border:5px solid black;
  }
`
export default Main
