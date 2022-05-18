import React from 'react'
import { Grid, DotButton } from '../../element/index'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import ReadyBtn from './ReadyBtn'
import VoteBtn from './VoteBtn'
import { history } from '../../redux/configureStore'

const StartBtn = ({ socket }) => {
  const roomInfo = useSelector((state) => state.room.current)
  const currentReady = useSelector((state) => state.room.ready)
  const memberSocket = useSelector((state) => state.member.socketId)
  const members = useSelector((state) => state.member.memberId)
  const startCheck = useSelector((state) => state.room.check)
  const currentId = localStorage.getItem('userNick')
  const [getStart, setStart] = React.useState(false)
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

  React.useEffect(() => {
    let check = members?.includes(roomInfo?.userId)
    if (members.length >= 1) {
      if (check == false && !startCheck) {
        history.replace('/gamemain')
        alert('방장이 나가서 방이 폭파되었습니다 ㅋ')
        return
      }
    } else {
      return
    }
  }, [members])

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
      {getStart == false ? (
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
        <VoteBtn />
      )}
    </>
  )
}

export default StartBtn
