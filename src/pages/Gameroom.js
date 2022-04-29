import styled from 'styled-components'
import Chatdiv from '../component/Chatdiv'
import { Grid, Button } from '../element/index'
import { useEffect, useRef, useState } from 'react'
import { actionCreators as postActions } from '../redux/modules/post'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function GameRoom(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const socket = useSelector((state) => state.post.data)
  const currentMember = useSelector((state) => state.post.member)
  const roomInfo = useSelector((state) => state.post.room)
  const jobs = useSelector((state) => state.post.jobs)
  const currentId = localStorage.getItem('userId')
  const [getNotice, setNotice] = useState(false)
  const [getWho, setWho] = useState()
  const [getWrite, setWrite] = useState([])
  const [getNight, setNight] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const text = useRef()
  const send = () => {
    let chatData = text.current.value
    socket.emit('msg', chatData)
  }
  const exitRoom = () => {
    history.replace('/gamemain')
    socket.emit('leaveRoom')
    whenExit()
  }
  const whenExit = () => {
    socket.on('leaveRoomMsg', (whosout, curr) => {
      console.log(whosout, curr)
      setWho(whosout + '님이 퇴장하셨습니다')
      dispatch(postActions.exceptExit(whosout))
      setNotice(true)
      setTimeout(() => {
        setNotice(false)
      }, 2000)
    })
  }

  const startGame = () => {
    socket.emit('startGame')
    dispatch(postActions.gameStart(currentMember, roomInfo.socketId))
    if (getNight == false) {
      socket.emit('timer', 120)
    } else {
      socket.emit('timer', 60)
    }
  }

  const Noti = styled.div`
    width: 200px;
    height: 50px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
    display: ${getNotice == true ? 'block' : 'none'};
  `
  const active = (clicker, clicked, job) => {
    console.log(clicker)
    if (clicker == clicked) {
      alert('다른사람뽑아')
      return
    }
    let selector = ''
    for (let i = 0; i < job.length; i++) {
      if (job[i].e.includes(clicker)) {
        console.log(job[i].job)
        selector = job[i].job
      }
    }
    socket.emit('vote', { selector, clicked })
  }

  useEffect(() => {
    socket.on('msg', (data) => {
      setWrite((list) => [...list, { data }])
    })

    socket.on('timer', (time) => {
      console.log(time)
      setMinutes(time.min)
      setSeconds(time.sec)
    })

    socket.on('joinRoomMsg', (whosenter, current) => {
      setWho(whosenter + '님이 입장하셨습니다')
      dispatch(postActions.currentMember(current))
      setNotice(true)
      setTimeout(() => {
        setNotice(false)
      }, 2000)
    })
    whenExit()

    let unlisten = history.listen((location) => {
      if (history.action === 'POP') {
        socket.emit('leaveRoom')
        whenExit()
      }
    })
    return () => {
      unlisten()
    }
  }, [socket])

  return (
    <Grid is_flex width="100vw" height="100vh">
      <Grid width="75vw" bg="pink" padding="30px">
        <Grid width="90%" height="90%" bg="beige">
          {currentMember.map((e, i) => {
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
                      active(currentId, e, jobs)
                    }}
                  >
                    투표하기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      active(currentId, e, jobs)
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
      <Grid width="500px" padding="5% 10px 5% 10px">
        <Noti>{getWho}</Noti>
        <div className="timer">
          {minutes} : {seconds}
        </div>
        <Button
          _onClick={() => {
            startGame()
          }}
        >
          시작하기
        </Button>
        <Grid height="30px">
          <Button
            _onClick={() => {
              exitRoom()
            }}
          >
            방 나가기
          </Button>
        </Grid>
        <Chatbox>
          <Grid width="100%" height="10%"></Grid>
          <Grid
            overflow="scroll"
            padding="10px 0 0 10px"
            height="75%"
            bg="#ACF3FF"
          >
            {getWrite.map((e) => {
              return <Chatdiv currentId={currentId} e={e} />
            })}
          </Grid>
          <Grid padding="5%" height="15%">
            <input
              ref={text}
              style={{
                borderRadius: '10px',
                padding: '10px',
                border: 'none',
                width: '75%',
                fontSize: '21px',
              }}
            />
            <Button
              margin="0 0 0 5px"
              width="15%"
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
      </Grid>
    </Grid>
  )
}

const Chatbox = styled.div`
  width: 100%;
  height: 80vh;
  background: #eee;
  border-radius: 5%;
  box-shadow: 1px 1px 1px 1px gray;
`

export default GameRoom
