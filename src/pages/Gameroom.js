import styled from 'styled-components'
import { Grid } from '../element/index'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import Header from '../component/Header'
import ChatBox from '../component/ChatBox'
import VideoContainer from '../component/VideoContainer'
import Noti from '../component/modal/NotiModal'
import JobModal from '../component/modal/JobModal'
import ExitBtn from '../component/buttons/ExitBtn'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/video.css'
import bgm from '../assets/sound/bgm/big_helmet.mp3'
import nightBg from '../assets/sound/effect/nightiscome.mp3'
import morningBg from '../assets/sound/effect/morning.mp3'
import win from '../assets/sound/effect/win.mp3'

function GameRoom(props) {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const currentTime = useSelector((state) => state.game.night)
  const endGame = useSelector((state) => state.game.endGameNoti)
  const startCard = useSelector((state) => state.game.card)
  const [darkMode, setDarkMode] = useState(false)
  const [soundOn, setSoundOn] = useState(false)

  const startBgm = new Audio(bgm)
  const nightBgm = new Audio(nightBg)
  const morningBgm = new Audio(morningBg)
  const winBgm = new Audio(win)

  if (soundOn) {
    startBgm.play()
  } else {
    startBgm.pause()
  }

  useEffect(() => {
    if (endGame !== null) {
      winBgm.play()
      setSoundOn(false)
    }
  }, [endGame])

  useEffect(() => {
    socket.on('isNight', (value) => {
      dispatch(gameActions.dayAndNight(value))
      dispatch(gameActions.dayCount())
    })
  }, [])

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

  useEffect(() => {
    let unlisten = history.listen((location) => {
      // 브라우저 뒤로가기 버튼(나가기) 누를때 호출
      if (history.action === 'POP') {
        // socket.emit('leaveRoom')
      }
    })

    return () => {
      dispatch(gameActions.playerWhoKilled(null))
      dispatch(gameActions.playerJob(null))
      dispatch(gameActions.copSelected(null))
      dispatch(gameActions.noticeRep(null))
      dispatch(memberActions.currentUserId([]))
      socket.off('isNight')
      socket.off('reporterOver')
      socket.removeAllListeners('isNight')
      socket.off('vote')
      socket.off('createRoom')
      socket.emit('leaveRoom')
      socket.emit('ready', false)
      socket.off('ready')
      dispatch(gameActions.dayCount(0))
      unlisten()
      dispatch(gameActions.repChanceOver(null))
      dispatch(roomActions.changeHost(null))
      dispatch(gameActions.noticeResult(null))
      dispatch(gameActions.playerWhoSurvived(null))
      dispatch(gameActions.dayAndNight(null))
      dispatch(gameActions.noticeEndGame(null))
      dispatch(gameActions.checkIsMafia(null))
      dispatch(gameActions.noticeResultNight(null))
    }
  }, [socket])

  useEffect(() => {
    if (endGame == null) {
      if (currentTime === false) {
        morningBgm.play()
        dayOrNight(false)
      } else if (currentTime === true && endGame === null) {
        nightBgm.play()
        dayOrNight(true)
      }
    }
  }, [currentTime])

  return (
    <>
      <Header />
      <div className={`${darkMode && endGame == null && 'dark-mode'}`}>
        {darkMode && endGame == null ? <ExitBtn night /> : <ExitBtn />}
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
