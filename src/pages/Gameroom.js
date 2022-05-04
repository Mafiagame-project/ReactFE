import styled from 'styled-components'
import { Planet } from 'react-planet'
import Chatdiv from '../component/Chatdiv'
import { Grid, Button } from '../element/index'
import { useEffect, useRef, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from '../component/Header'
import Time from '../component/Timer'

function GameRoom(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const socket = useSelector((state) => state.game.socket)
  const memberSocket = useSelector((state) => state.member.socketId)
  const notification = useSelector((state) => state.game.noti)
  const memberId = useSelector((state) => state.member.memberId)
  const roomInfo = useSelector((state) => state.room.current)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const currentId = localStorage.getItem('userId')

  const [getNotice, setNotice] = useState(false)
  const [getWho, setWho] = useState()
  const [getWrite, setWrite] = useState([])
  const [getNight, setNight] = useState()
  const [getJob, setJob] = useState()
  const [getStart, setStart] = useState(false)
  const chatting = useRef()

  const send = () => {
    // 채팅을 보낼 때 호출되는 함수
    let chatData = chatting.current.value
    socket.emit('msg', chatData)
  }

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
  const active = (clickedId, clicker) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    if (currentId == clickedId) {
      alert('다른사람을 뽑아주세요')
      return
    }
    if (killed) {
      killed.forEach((id) => {
        if (clicker.player == id) {
          alert('죽었습니다')
          return
        } else {
          socket.emit('vote', { clickerJob, clickerId, clickedId })
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
    }
  }
  console.log(killed)
  useEffect(() => {
    socket.on('msg', (data) => {
      // 서버에서 오는 메세지 데이터를 받음
      setWrite((list) => [...list, { data }])
    })
    let unlisten = history.listen((location) => {
      // 브라우저 뒤로가기 버튼(나가기) 누를때 호출
      if (history.action === 'POP') {
        socket.emit('leaveRoom')
        whenExit()
      }
    })
    return () => {
      unlisten()
    }
  }, [socket])

  // 채팅창 아래로 스크롤
  // const chatRef = useRef(null)

  // const scrollToBottom = () => {
  //   chatRef.current.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(scrollToBottom, [getWrite])

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
      <Grid is_flex width="100vw" height="90vh">
        <Grid width="75vw" bg="white" padding="30px">
          <Grid width="90%" height="100%">
            <Container>
              <Planet
                orbitStyle={(defaultStyle) => ({
                  ...defaultStyle,
                  borderWidth: 0.1,
                  borderStyle: 'dashed',
                  borderColor: '#6f03fc',
                })}
                orbitRadius={400}
                centerContent={
                  <div
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: '50%',
                    }}
                  />
                }
                open
              >
                {memberId.map((e) => {
                  return (
                    <Inner>
                      <h3>{e}</h3>
                      <button
                        onClick={() => {
                          active(e, playerJob)
                        }}
                      >
                        선택하기
                      </button>
                    </Inner>
                  )
                })}
              </Planet>
            </Container>
          </Grid>
        </Grid>
        <Grid width="500px" padding="2% 10px 2% 2px" margin="0 10px 0 0">
          <Grid height="70px">
            {notification ? (
              <Noti>{notification.id}</Noti>
            ) : (
              <Noti>{getWho}</Noti>
            )}
          </Grid>
          <Chatbox>
            <Grid bg="white" width="100%" height="5%" isFlex_center>
              <Time />
            </Grid>
            <Grid
              overflow="scroll"
              padding="10px 0 0 10px"
              height="75%"
              bg="#d2d2d2"
            >
              {getWrite.map((e) => {
                return <Chatdiv currentId={currentId} e={e} />
              })}
            </Grid>
            <Grid bg="white" padding="20px 0 0 0" height="15%">
              <input
                ref={chatting}
                style={{
                  borderRadius: '10px',
                  padding: '10px',
                  border: 'none',
                  width: '75%',
                  fontSize: '16px',
                  background: '#d2d2d2',
                }}
              />
              <Button
                margin="0 0 0 5px"
                width="17%"
                padding="10px"
                bg="#FFD5A6"
                _onClick={() => {
                  send()
                }}
              >
                보내기
              </Button>
            </Grid>
          </Chatbox>
          {getStart == false ? (
            <Grid isFlex_center width="100%" height="30px">
              {roomInfo?.userId == currentId ? (
                <Button
                  margin="20px"
                  padding="10px 20px 10px 20px"
                  size="35px"
                  bg="orange"
                  _onClick={() => {
                    startGame()
                  }}
                >
                  시작하기
                </Button>
              ) : (
                <Button
                  margin="20px"
                  padding="10px 20px 10px 20px"
                  size="35px"
                  bg="orange"
                  _onClick={() => {
                    readyGame()
                  }}
                >
                  준비하기
                </Button>
              )}
              <Button
                margin="20px"
                padding="10px 20px 10px 20px"
                size="35px"
                bg="orange"
                _onClick={() => {
                  exitRoom()
                }}
              >
                방 나가기
              </Button>
            </Grid>
          ) : (
            <Grid isFlex_center width="100%" height="30px">
              <Button
                margin="20px"
                padding="10px 20px 10px 20px"
                size="35px"
                bg="orange"
                _onClick={() => {
                  exitRoom()
                }}
              >
                방 나가기
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}
const Container = styled.div`
  width: 400px;
  height: 400px;
  position: absolute;
  top: 45%;
  left: 30%;
`

const Timer = styled.div`
  font-size: 32px;
  font-weight: bold;
`
const Inner = styled.div`
  height: 180px;
  width: 180px;
  border-radius: 50%;
  background: #9257ad;
`

const Chatbox = styled.div`
  width: 100%;
  height: 70vh;
  border-radius: 5%;
`

export default GameRoom
