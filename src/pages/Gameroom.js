import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { actionCreators as userActions } from '../redux/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../component/Header'
import ChatBox from '../component/ChatBox'
import VideoContainer from '../component/VideoContainer'
import Noti from '../component/modal/NotiModal'
import JobModal from '../component/modal/JobModal'
import ExitBtn from '../component/buttons/ExitBtn'
import '../styles/video.css'
import NewsBtn from '../component/buttons/NewsBtn'
import TutorialBtn from '../component/buttons/TutorialBtn'
import { winSF, morningSF } from '../element/Sound'

function GameRoom() {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const currentTime = useSelector((state) => state.game.night)
  const endGame = useSelector((state) => state.game.endGameNoti)
  const [darkMode, setDarkMode] = useState(false)

  window.onbeforeunload = function () {
    return dispatch(userActions.logOutDB())
  }
  // 게임이 끝나면 엔딩음악 재생!
  useEffect(() => {
    if (endGame !== null) {
      winSF.play()
    }
  }, [endGame])

  // 밤인지 아닌지를 판단하는 소켓. dayCount를 보내면서 라운드를 판단
  useEffect(() => {
    socket.on('isNight', (value) => {
      dispatch(gameActions.dayAndNight(value))
      dispatch(gameActions.dayCount())
    })
  }, [])

  // 밤과 낮이 바뀔때마다 출력되는 toast 알람
  const dayOrNight = (time) => {
    if (time == true) {
      setDarkMode(true)
      toast.error('밤이 되었습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-night-time',
        autoClose: 3000,
      })
    } else if (time == false) {
      setDarkMode(false)
      toast.success('낮이 되었습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-day-time',
        autoClose: 3000,
      })
    }
  }
  // 게임방을 탈출할 때 소켓을 끄고 리덕스도 초기화 시킴
  useEffect(() => {
    return () => {
      socket.off('isNight')
      socket.off('reporterOver')
      socket.removeAllListeners('isNight')
      socket.off('vote')
      socket.off('createRoom')
      socket.emit('leaveRoom')
      socket.emit('ready', false)
      socket.off('ready')
      dispatch(gameActions.playerWhoKilled(null))
      dispatch(gameActions.playerJob(null))
      dispatch(gameActions.noticeRep(null))
      dispatch(memberActions.currentUserId([]))
      dispatch(gameActions.dayCount(0))
      dispatch(gameActions.repChanceOver(null))
      dispatch(gameActions.noticeResult(null))
      dispatch(gameActions.playerWhoSurvived(null))
      dispatch(gameActions.dayAndNight(null))
      dispatch(gameActions.noticeEndGame(null))
      dispatch(gameActions.checkIsMafia(null))
      dispatch(gameActions.noticeResultNight(null))
      dispatch(gameActions.noticeJob(null))
      dispatch(roomActions.roomReady(null))
      dispatch(gameActions.aiPlayer(null))
    }
  }, [socket])

  useEffect(() => {
    if (endGame == null) { // 게임이 끝났을 때 실행되지 않도록 방지하기
      if (currentTime === false) { // 현재시간이 false면 낮입니다
        morningSF.play()
        dayOrNight(false)
      } else if (currentTime === true && endGame === null) {
        dayOrNight(true)
      }
    }
  }, [currentTime])

  return (
    <>
      <Header />
      <div className={`${darkMode && endGame == null && 'dark-mode'}`}>
        {darkMode && endGame == null ? <ExitBtn night /> : <ExitBtn />}
        <TutorialBtn />
        <NewsBtn />
        <Container>
          <VideoContainer socket={socket} />
          <ChatBox socket={socket} currentTime={currentTime} />
        </Container>
        <JobModal />
        <Noti />
        <ToastContainer />
      </div>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
`
export default GameRoom
