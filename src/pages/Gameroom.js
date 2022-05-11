import styled from 'styled-components'
import { Grid, Button, DotButton, Text } from '../element/index'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import { useParams } from 'react-router-dom'
import Header from '../component/Header'
import ChatBox from '../component/ChatBox'
import VideoContainer from '../component/VideoContainer'
import Peer from 'peerjs'
import Noti from '../component/modal/NotiModal'
import JobModal from '../component/modal/JobModal'

function GameRoom(props) {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const memberSocket = useSelector((state) => state.member.socketId)
  const voteResult = useSelector((state) => state.game.resultNoti)
  const currentReady = useSelector((state) => state.room.ready)
  const copNoti = useSelector((state) => state.game.copNoti)
  const host = useSelector((state) => state.room.host)
  const currentTime = useSelector((state) => state.game.night)
  const roomInfo = useSelector((state) => state.room.current)
  const startCard = useSelector((state) => state.game.card)
  const currentId = localStorage.getItem('userId')

  const [isOpen, setIsOpen] = useState(false)
  const [getNotice, setNotice] = useState(false)
  const [getReady, setReady] = useState(false)
  const [getStart, setStart] = useState(false)
  console.log('twice3')
  const exitRoom = () => {
    // 방에서 나가기 버튼을 누를때 호출
    socket.emit('leaveRoom')
    history.replace('/gamemain')
    dispatch(gameActions.noticeResult(null))
    dispatch(gameActions.playerWhoSurvived(null))
    dispatch(gameActions.dayAndNight(null))
    dispatch(gameActions.noticeEndGame(null))
    dispatch(gameActions.readyCheck(null))
    dispatch(gameActions.noticeJob(null))
  }
  const startGame = () => {
    if (memberSocket.length < 4) {
      alert('게임시작을 위해서 최소 4명이상이 필요합니다')
    } else {
      if (memberSocket.length - 1 == currentReady.length) {
        socket.emit('startGame')
        setStart(true)
      } else {
        alert('아직 준비를 하지 않은 참가자가 있습니다!')
      }
    }
  }
  const enterNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 3000)
  }

  const readyGame = () => {
    if (getReady == false) {
      socket.emit('ready', true)
    } else {
      socket.emit('ready', false)
    }
    setReady(!getReady)
  }

  useEffect(() => {
    let unlisten = history.listen((location) => {
      // 브라우저 뒤로가기 버튼(나가기) 누를때 호출
      if (history.action === 'POP') {
        socket.emit('leaveRoom')
        dispatch(gameActions.noticeResult(null))
        dispatch(gameActions.playerWhoSurvived(null))
        dispatch(gameActions.dayAndNight(null))
        dispatch(gameActions.noticeEndGame(null))
      }
    })
    // if (voteResult?.length > 0) {
    //   enterNoti()
    // }

    // if (startCard || copNoti) {
    //   console.log(copNoti)
    //   setIsOpen(true)
    //   setTimeout(() => {
    //     setIsOpen(false)
    //     dispatch(gameActions.startCard(null))
    //     if (copNoti) {
    //       dispatch(gameActions.noticeCop(null))
    //     }
    //   }, 3000)
    // }
    return () => {
      dispatch(gameActions.playerWhoKilled(null))
      unlisten()
    }
  }, [socket, voteResult, startCard, copNoti])

  // const LeftBox = styled.div`
  //   text-align: center;
  //   margin: 0 auto;
  //   width: 100%;
  //   height: 90vh;
  //   transition-property: background;
  //   transition-timing-function: ease;
  //   background: ${currentTime == '밤' ? '#333333' : 'white'};
  // `

  return (
    <>
      <Header />
      <Container>
        <Grid is_flex>
          {isOpen == true ? (
            <Modalblack>
              <JobModal />
            </Modalblack>
          ) : null}
          {getNotice == true ? (
            <Modalblack>
              <Noti></Noti>
            </Modalblack>
          ) : null}
          <Grid>
            <Grid margin="17% 0 0 0" isFlex_center height="30%">
      <VideoContainer style={videoContainer} socket={socket} />
      </Grid>
            <Grid height="30%" />
            <Grid height="10vh">
              <Grid isFlex_center>
                {getStart == false ? (
                  <Grid isFlex_center>
                    {roomInfo?.userId == currentId || host == currentId ? (
                      <DotButton
                        black02
                        text="시작하기"
                        _onClick={() => {
                          startGame()
                        }}
                      />
                    ) : (
                      <>
                        {getReady == false ? (
                          <DotButton
                            white02
                            text="준비하기"
                            _onClick={() => {
                              readyGame()
                            }}
                          />
                        ) : (
                          <DotButton
                            black02
                            text="준비완료"
                            _onClick={() => {
                              readyGame()
                            }}
                          />
                        )}
                      </>
                    )}
                  </Grid>
                ) : (
                  <Grid>
                    <DotButton
                      white02
                      text="투표하기"
                      _onClick={() => {
                        exitRoom()
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <RightBox>
            <ChatBox socket={socket} />
            <Button
              bg="black"
              smallBtn
              _onClick={() => {
                exitRoom()
              }}
            >
              방 나가기
            </Button>
          </RightBox>
        </Grid>
        <Button></Button>
      </Container>
    </>
  )
}
const videoContainer = styled.div``

const PlayerBox = styled.div``

const Btns = styled.div`
  z-index: 9999;
  position: fixed;
  bottom: 0;
`
const RightBox = styled.div`
  margin: 40px;
`

const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 5;
`
const Container = styled.div`
  width: 100%;
  height: 80vh;
`
//  background: ${currentTime == '밤' ? 'black' : 'white'};
export default GameRoom
