import styled from 'styled-components'
import { Grid, Button, Text } from '../element/index'
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
  const enterOutNoti = useSelector((state) => state.game.enterOutNoti)
  const voteResult = useSelector(state => state.game.resultNoti)
  const endGameNoti = useSelector(state => state.game.endGameNoti)
  const survivedNoti = useSelector(state => state.game.survived)
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
    dispatch(gameActions.noticeResult(null))
    dispatch(gameActions.playerWhoSurvived(null))
    // whenExit()
  }
  
  const whenExit = () => {}

  const startGame = () => {
    if(memberSocket.length < 4){
      alert('게임시작을 위해서 최소 4명이상이 필요합니다')
    } else {
      socket.emit('startGame')
      setStart(true)
    }
  }
  console.log(voteResult);
  const enterNoti = () => {
    setNotice(true)
    setTimeout(()=>{
      setNotice(false)
    },3000)
  }

  const readyGame = () => {}

  useEffect(() => {
    let unlisten = history.listen((location) => {
      // 브라우저 뒤로가기 버튼(나가기) 누를때 호출
      if (history.action === 'POP') {
        socket.emit('leaveRoom')
        dispatch(gameActions.noticeResult(null))
        dispatch(gameActions.playerWhoSurvived(null))
      }
    })
    if(voteResult?.length > 0){
      enterNoti();
    }
    return () => {
      dispatch(gameActions.playerWhoKilled(null))
      unlisten()
    }
  }, [socket, voteResult])

  const Noti = styled.div`
    width: 100%;
    height: 500px;
    margin-top:200px;
    padding: 50px;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    position:absolute;
    z-index: 5;
    display: ${getNotice == true ? 'block' : 'none'};
  `
  return (
    <>
      <Header />
      <Container>
        <Grid is_flex>
          {
            endGameNoti
            ?<Noti>
              <Text size='32px' bold color='white'>{voteResult} 님이 죽었습니다</Text>
              <Text size='32px' bold color='white'>{endGameNoti}</Text>
            </Noti>
            : <Noti>
              {
                survivedNoti
                ?<>
                 <Text size='32px' bold color='white'>{voteResult} 님이 죽었습니다</Text>
                 <Text size='32px' bold color='white'>{survivedNoti} 님이 공격을 당했지만 의사에 의해 살았습니다</Text>
                 </>
                :<Text size='32px' bold color='white'>{voteResult} 님이 죽었습니다</Text>
              }
            </Noti>
          }
          <LeftBox>
            <VideoContainer style={videoContainer} socket={socket} />
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
              
              <div>왜안뜨냐</div>
            </Grid>
            <ChatBox socket={socket} />
            <button onClick={()=>{startGame()}}>시작눈러라</button>
          </RightBox>
        </Grid>
      </Container>
    </>
  )
}
const videoContainer = styled.div`
`

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
