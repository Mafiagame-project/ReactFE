import styled from 'styled-components'
import { Grid, Button } from '../element/index'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import Header from '../component/Header'
import ChatBox from '../component/ChatBox'
import VideoContainer from '../component/VideoContainer'

function GameRoom(props) {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const memberSocket = useSelector((state) => state.member.socketId)
  const notification = useSelector((state) => state.game.noti)
  const roomInfo = useSelector((state) => state.room.current)
  const currentId = localStorage.getItem('userId')

  const [getNotice, setNotice] = useState(false)
  const [getWho, setWho] = useState()
  const [getNight, setNight] = useState()
  const [getJob, setJob] = useState()
  const [getStart, setStart] = useState(false)

  const exitRoom = () => {
    // 방에서 나가기 버튼을 누를때 호출
    socket.emit('leaveRoom')
    history.replace('/gamemain')
    // whenExit()
  }

  const whenExit = () => {}

  const startGame = () => {
    // 게임 시작하기 버튼을 누르면 발생
    socket.emit('startGame')
    setStart(true)
  }

  const readyGame = () => {}

  useEffect(() => {
    let unlisten = history.listen((location) => {
      // 브라우저 뒤로가기 버튼(나가기) 누를때 호출
      if (history.action === 'POP') {
        socket.emit('leaveRoom')
        whenExit()
      }
    })
    return () => {
      dispatch(gameActions.playerWhoKilled(null))
      unlisten()
    }
  }, [socket])

  const Noti = styled.div`
    width: 400px;
    height: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, 0.4);
    font-size: 20px;
    text-align: center;
    z-index: 5;
    display: ${getNotice == true ? 'block' : 'none'};
  `
  return (
    <>
      <Header />
      <Container>
        <Grid is_flex>
          <LeftBox>
            <VideoContainer />
            <Grid>
              {getStart == false ? (
                <Grid>
                  {roomInfo?.userId == currentId ? (
                    <Button
                      bg="#C4C4C4"
                      smallBtn
                      _onClick={() => {
                        startGame()
                      }}
                    >
                      시작하기
                    </Button>
                  ) : (
                    <Button
                      smallBtn
                      _onClick={() => {
                        readyGame()
                      }}
                    >
                      준비하기
                    </Button>
                  )}
                  <Button
                    smallBtn
                    _onClick={() => {
                      exitRoom()
                    }}
                  >
                    방 나가기
                  </Button>
                </Grid>
              ) : (
                <Grid>
                  <Button
                    bg="#C4C4C4"
                    smallBtn
                    _onClick={() => {
                      exitRoom()
                    }}
                  >
                    방 나가기
                  </Button>
                </Grid>
              )}
            </Grid>
          </LeftBox>

          <RightBox>
            <Grid>
              {notification ? (
                <Noti>{notification.id}</Noti>
              ) : (
                <Noti>{getWho}</Noti>
              )}
            </Grid>
            <ChatBox socket={socket} />
          </RightBox>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div``

const LeftBox = styled.div`
  text-align: center;
  flex-direction: column;
  margin: auto 0;
`
const Btns = styled.div`
  z-index: 9999;
`
const RightBox = styled.div`
  margin: 40px;
`

export default GameRoom
