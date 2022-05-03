import styled from 'styled-components'
import Chatdiv from '../component/Chatdiv'
import { Grid, Button } from '../element/index'
import { useEffect, useRef, useState } from 'react'
import { actionCreators as postActions } from '../redux/modules/post'
import { actionCreators as roomActions } from '../redux/modules/rooms'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from '../component/Header';
import Time from '../component/Timer';

function GameRoom(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const socket = useSelector((state) => state.post.data)
  const currentMember = useSelector((state) => state.room.member)
  const notification = useSelector(state => state.post.noti);
  const memberId = useSelector(state => state.room.memberId)
  const roomHost = useSelector((state) => state.room.host)
  const currentId = localStorage.getItem('userId')
  const [getNotice, setNotice] = useState(false)
  const [getWho, setWho] = useState();
  const [getWrite, setWrite] = useState([]);
  const [getNight, setNight] = useState(false);
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
    whenExit()
  }

  const whenExit = () => {
    // 방에서 나가는 경우 발생되는 이벤트 모음
    socket.on('leaveRoomMsg', (whosout, whosId) => {
      setWho(whosId + '님이 퇴장하셨습니다')
      console.log(whosId)
      dispatch(roomActions.exceptExit(whosout))
      dispatch(roomActions.exitId(whosId))
      setNotice(true)
      setTimeout(() => {
        setNotice(false)
      }, 2000)
    })
  }

  const startGame = () => {
    // 게임 시작하기 버튼을 누르면 발생
    socket.emit('startGame')
    socket.emit('getJob', currentMember)
    socket.emit('timer', 120)
    setStart(true)
  }
  console.log(notification, getNight);
  const readyGame = () => {}
  const active = (clickedId, clicker, day) => {
    // 투표, 선택등 행동이벤트 발생시 호출
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    if (currentId == clickedId) {
      alert('다른사람을 뽑아주세요')
      return
    }
    // 클릭한사람의 직업, 클릭한 사람의 아이디, 클릭된자의 아이디, 낮밤
    socket.emit('vote', { clickerJob, clickerId, clickedId, day })
  }
  
  useEffect(() => {
    socket.on('msg', (data) => {
      // 서버에서 오는 메세지 데이터를 받음
      setWrite((list) => [...list, { data }])
    })

    socket.on('startGame', (msg) => {
      // dispatch(postActions.gameStart(currentMember, roomInfo.socketId))
    })
    socket.on('getJob', (player, playerJob) => {
      console.log(player, playerJob)
      setJob({ player, playerJob })
      // alert(playerJob);
    })


    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      // 참가자가 방에 들어올때 호출
      setWho(incoming + '님이 입장하셨습니다')
      console.log(currentAll);
      dispatch(roomActions.currentMember(idValue));
      dispatch(roomActions.currentId(currentAll));
      setNotice(true)
      setTimeout(() => {
        setNotice(false)
      }, 2000)
    })
    whenExit()
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
          <Grid width="90%" height="90%" bg="beige">
            {memberId.map((e, i) => {
              return (
                <div
                  style={{
                    marginLeft: '50px',
                    marginBottom: '50px',
                    float: 'left',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: '#eee',
                  }}
                >
                  {getNight == false ? (
                    <button
                      onClick={() => {
                        active(e, getJob, !getNight)
                      }}
                    >
                      투표하기
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        active(e, getJob, !getNight)
                      }}
                    >
                      선택하기
                    </button>
                  )}
                </div>
              )
            })}
          </Grid>
        </Grid>
        <Grid width="500px" padding="2% 10px 2% 2px" margin="0 10px 0 0">
          <Grid height="70px">
            {
              notification
              ? <Noti>{notification.id}</Noti>
              : <Noti>{getWho}</Noti>
            }
          </Grid>
          <Chatbox>
            <Grid bg="white" width="100%" height="5%" isFlex_center>
              
              <Time getNight={getNight} setNight={setNight} />
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
              {roomHost == currentId ? (
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
const Timer = styled.div`
  font-size: 32px;
  font-weight: bold;
`

const Chatbox = styled.div`
  width: 100%;
  height: 70vh;
  border-radius: 5%;
`

export default GameRoom
