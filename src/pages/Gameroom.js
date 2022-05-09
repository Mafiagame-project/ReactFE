import styled from 'styled-components'
import { Grid, Button, Text } from '../element/index'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
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
  const enterOutNoti = useSelector((state) => state.game.enterOutNoti)
  const voteResult = useSelector((state) => state.game.resultNoti)
  const readyCheck = useSelector((state) => state.game.ready)
  const endGameNoti = useSelector((state) => state.game.endGameNoti)
  const survivedNoti = useSelector((state) => state.game.survived)
  const currentTime = useSelector((state) => state.game.night)
  const roomInfo = useSelector((state) => state.room.current)
  const startCard = useSelector(state => state.game.card);
  const players = useSelector(state => state.game.jobNoti)
  const currentId = localStorage.getItem('userId')

  const [isOpen, setIsOpen] = useState(false)
  const [getNotice, setNotice] = useState(false)
  const [getReady, setReady] = useState(false)
  const [getStart, setStart] = useState(false)

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
      socket.emit('startGame')
      setStart(true)
    }
  }
  const enterNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 5000)
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
    if (voteResult?.length > 0) {
      enterNoti()
    }
    if(startCard == true){
      setIsOpen(true)
      setTimeout(()=>{
        setIsOpen(false)
        dispatch(gameActions.startCard(false))
      },5000)
    }
    return () => {
      dispatch(gameActions.playerWhoKilled(null))
      unlisten()
    }
  }, [socket, voteResult, startCard])

  const LeftBox = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 90vh;
  transition-property: background;
  transition-timing-function: ease;
  background:${currentTime == '밤' ? 'white' : '#333333'}
`

  return (
    <>
      <Header />
      <Container>
        <Grid is_flex>
          {
            isOpen == true 
            ? <Modalblack><JobModal players={players}/></Modalblack>
            : null
          }
          {getNotice == true ? (
            <Modalblack>
              <Noti></Noti>
            </Modalblack>
          ) : null}
          <LeftBox>
            <Grid margin="17% 0 0 0" isFlex_center height="30%">
              <VideoContainer style={videoContainer} socket={socket} />
            </Grid>
            <Grid height='30%'/>
            <Grid height="10vh">
          <Grid isFlex_center>
            {getStart == false ? (
              <Grid isFlex_center>
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
                  <>
                    {getReady == false ? (
                      <ReadyBtn
                        smallBtn
                        onClick={() => {
                          readyGame()
                        }}
                      >
                        준비하기
                      </ReadyBtn>
                    ) : (
                      <ReadyBtn
                        bg="gray"
                        smallBtn
                        onClick={() => {
                          readyGame()
                        }}
                      >
                        준비완료
                      </ReadyBtn>
                    )}
                  </>
                )}
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
                  투표하기
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
          </LeftBox>

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
const ReadyBtn = styled.button`
  width: 250px;
  height: 60px;

  border: none;
  font-size: 20px;
  z-index: 5;
`
// background: ${getReady == true ? 'gray' : '#eee'};
const Container = styled.div`
  width: 100%;
  height: 80vh;
`
//  background: ${currentTime == '밤' ? 'black' : 'white'};
export default GameRoom
