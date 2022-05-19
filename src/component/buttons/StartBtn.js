import React from 'react'
import { Grid, DotButton } from '../../element/index'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import ReadyBtn from './ReadyBtn'
import VoteBtn from './VoteBtn'
import { history } from '../../redux/configureStore'
import { actionCreators as gameActions } from '../../redux/modules/game'

const StartBtn = ({ socket }) => {
  const dispatch = useDispatch()
  const roomInfo = useSelector((state) => state.room.current)
  const currentReady = useSelector((state) => state.room.ready)
  const memberSocket = useSelector((state) => state.member.socketId)
  const members = useSelector((state) => state.member.memberId)
  const startCheck = useSelector((state) => state.room.check)
  const endGame = useSelector((state) => state.game.endGameNoti)
  const currentId = localStorage.getItem('userNick')
  const [getStart, setStart] = React.useState(false)

  const startGame = () => {
    if (memberSocket.length < 4) {
      startGameNoti(1)
    } else {
      if (memberSocket.length - 1 == currentReady.length) {
        socket.emit('startGame')
        dispatch(gameActions.noticeEndGame(null))
        setStart(true)
      } else {
        startGameNoti(2)
      }
    }
  }
  console.log(currentReady)
  React.useEffect(() => {
    let check = members?.includes(roomInfo?.userId)
    if (members.length >= 1) {
      if (check == false && !startCheck) {
        whenHostOut()
        setTimeout(()=>{
          history.replace('/gamemain')
        },2000)
        return
      }
    } else {
      return
    }
  }, [members])

  const whenHostOut = () => {
    toast.warning('호스트가 방을 나갔습니다!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-host-out',
      autoClose: 1000,
    })
  }

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
  return (
    <>
      {getStart == false || endGame ? (
        <>
          {roomInfo?.userId == currentId ? (
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
        <ReadyBtn />
      )}
      <VoteBtn />
    </>
  )
}

export default StartBtn
