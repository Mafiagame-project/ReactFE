import styled from 'styled-components'
import { Grid, Text, Button, DotButton } from '../element/index'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import Header from '../component/Header'
import Timer from '../component/Timer'
import ChatBox from '../component/ChatBox'
import VideoContainer from '../component/VideoContainer'
import Noti from '../component/modal/NotiModal'
import JobModal from '../component/modal/JobModal'
import ReadyBtn from '../component/ReadyBtn'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../component/video.css'
import ModalPortal from '../component/modal/ModalPortal'
import VoteModal from '../component/modal/VoteModal'
import ExitModal from '../component/modal/ExitModal'
import exit from '../assets/icons/black/exit_game.png'

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
  const playerJob = useSelector((state) => state.game.jobNoti)
  const currentId = localStorage.getItem('userId')
  const [voteOpen, setVoteOpen] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [getNotice, setNotice] = useState(false)
  const [getStart, setStart] = useState(false)

  const startGameNoti = (count) => {
    if (count === 1) {
      toast.info('게임시작을 위해서 최소 4명이상이 필요합니다', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-startPeople',
        autoClose: 2000,
      })
    } else {
      toast.info('아직 준비를 하지 않은 참가자가 있습니다!', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-startPeople',
        autoClose: 2000,
      })
    }
  }

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
      startGameNoti(1)
    } else {
      if (memberSocket.length - 1 == currentReady.length) {
        socket.emit('startGame')
        setStart(true)
      } else {
        startGameNoti(2)
      }
    }
  }
  const enterNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 16000)
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

    return () => {
      dispatch(gameActions.playerWhoKilled(null))
      unlisten()
    }
  }, [socket])

  useEffect(() => {
    if (voteResult?.length > 0) {
      enterNoti()
    }
  }, [voteResult])

  useEffect(() => {
    if (startCard) {
      setIsOpen(true)
      setTimeout(() => {
        setIsOpen(false)
        dispatch(gameActions.startCard(null))
      }, 3000)
    }
  }, [startCard])

  return (
    <>
      <Header />
      <JobModal />
      <button onClick={enterNoti}></button>
      {getNotice == true ? <Noti></Noti> : null}

      <Grid is_flex width="90%" margin="0 auto">
        <Grid flexColumn height="70vh">
          <Grid start>
            <Grid>
              <img src={exit} onClick={() => setExitOpen(true)} />
              <Text size="12px">방 나가기</Text>
            </Grid>
            <VideoContainer socket={socket} />
          </Grid>
          <Grid isFlex_center>
            {getStart == false ? (
              <>
                {roomInfo?.userId == currentId || host == currentId ? (
                  <DotButton
                    black02
                    text="시작하기"
                    _onClick={() => {
                      startGame()
                    }}
                  />
                ) : (
                  <ReadyBtn />
                )}
              </>
            ) : (
              <>
                <DotButton
                  white02
                  text="투표하기"
                  _onClick={() => {
                    exitRoom()
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>

        <Grid center width="40%">
          <Timer />
          <ChatBox socket={socket} />
          <ToastContainer />
        </Grid>
      </Grid>

      <ModalPortal>
        {voteOpen && <VoteModal onClose={() => setVoteOpen(false)} />}
      </ModalPortal>
      <ModalPortal>
        {exitOpen && (
          <ExitModal socket={socket} onClose={() => setExitOpen(false)} />
        )}
      </ModalPortal>
    </>
  )
}

export default GameRoom
