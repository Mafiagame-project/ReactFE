import styled from 'styled-components'
import { Grid } from '../element/index'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import Header from '../component/Header'
import ChatBox from '../component/ChatBox'
import VideoContainer from '../component/VideoContainer'
import Noti from '../component/modal/NotiModal'
import JobModal from '../component/modal/JobModal'
import StartBtn from '../component/buttons/StartBtn'
import ExitBtn from '../component/buttons/ExitBtn'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../component/video.css'

function GameRoom(props) {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const memberSocket = useSelector((state) => state.member.socketId)
  const voteResult = useSelector((state) => state.game.resultNoti)
  const currentTime = useSelector((state) => state.game.night)
  const roomInfo = useSelector((state) => state.room.current)
  const startCard = useSelector((state) => state.game.card)
  const playerJob = useSelector((state) => state.game.jobNoti)
  const currentId = localStorage.getItem('userId')
  const [isOpen, setIsOpen] = useState(false)
  const [getNotice, setNotice] = useState(false)

  const dayOrNight = (time) => {
    if (time == true) {
      toast.error('밤이 되었습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-time',
        autoClose: 3000,
      })
    } else if (time == false) {
      toast.success('낮이 되었습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-time',
        autoClose: 3000,
      })
    }
  }

  const enterNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 6000)
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
      dispatch(gameActions.playerJob(null))
      dispatch(gameActions.copSelected(null))
      dispatch(gameActions.noticeRep(null))
      // dispatch(gameActions.roomReady(null))
      unlisten()
      dispatch(roomActions.changeHost(null))
    }
  }, [socket])

  useEffect(() => {
    if (voteResult?.length > 0) {
      enterNoti()
    }
  }, [voteResult])

  useEffect(() => {
    if (currentTime === false) {
      dayOrNight(false)
    } else if (currentTime === true) {
      dayOrNight(true)
    }
  }, [currentTime])

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
      <Grid isFlex_center width="90%" margin="0 auto">
        <Grid>
          <ExitBtn />
          <Grid margin="0 auto" width="60%">
            <VideoContainer socket={socket} />
            <StartBtn socket={socket} />
          </Grid>
        </Grid>
        <Grid width="40%">
          <ChatBox socket={socket} />
        </Grid>
      </Grid>

      <JobModal />
      {getNotice == true ? <Noti></Noti> : null}
      <ToastContainer />
    </>
  )
}

export default GameRoom
