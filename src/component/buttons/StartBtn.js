import React, { useEffect } from 'react'
import { DotButton } from '../../element/index'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/configureStore'
import { ToastContainer, toast } from 'react-toastify'
import ReadyBtn from './ReadyBtn'
import VoteBtn from './VoteBtn'
import { actionCreators as gameActions } from '../../redux/modules/game'
import pop from '../../assets/sound/effect/pop.wav'
import pop03 from '../../assets/sound/effect/alert.mp3'

const StartBtn = ({ socket }) => {
  const dispatch = useDispatch()
  const roomInfo = useSelector((state) => state.room.current)
  const currentReady = useSelector((state) => state.room.ready)
  const memberSocket = useSelector((state) => state.member.socketId)
  const members = useSelector((state) => state.member.memberId)
  const startCheck = useSelector((state) => state.room.check)
  const startCard = useSelector((state) => state.game.card)
  const endGame = useSelector((state) => state.game.endGameNoti)
  const currentId = localStorage.getItem('userNick')
  const [getStart, setStart] = React.useState(false)
  const startBg = new Audio(pop03)

  const startGame = () => {
    if (memberSocket.length < 4) {
      startGameNoti(1)
    } else {
      if (memberSocket.length - 1 === currentReady.length) {
        startBg.play()
        socket.emit('startGame')
        dispatch(gameActions.noticeEndGame(null))
        setStart(true)
      } else {
        startGameNoti(2)
      }
    }
  }

  const startAlarm = () => {
    toast.success('게임이 시작되었습니다. 이야기를 나눠보세요!', {
      position: toast.POSITION.TOP_LEFT,
      className: 'toast-start-alarm',
      autoClose: 3000,
    })
  }
  useEffect(() => {
    if (startCard) {
      startAlarm()
      // startBgm.play()
      setTimeout(() => {
        dispatch(gameActions.startCard(null))
      }, 3000)
    }
  }, [startCard])

  useEffect(()=>{
    if (endGame !== null) {
        setTimeout(() => {
        whenGameOff()
        setTimeout(() => {
          history.replace('/gamemain')
        }, 5000)
      }, 5000)

    }
  },[endGame])

  React.useEffect(() => {
    let check = members?.includes(roomInfo?.userId)
    if (members.length >= 1) {
      if (check === false && !startCheck) {
        whenHostOut()
        setTimeout(() => {
          history.replace('/gamemain')
        }, 2000)
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
  const whenGameOff = () => {
    toast.warning('게임이 종료되었습니다! 메인으로 이동합니다', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-host-out',
      autoClose: 4000,
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
      let withOutHost = members.filter((nick) => nick !== roomInfo?.userId)
      let result = ''
      withOutHost.forEach((e, idx) => {
        if (e !== currentReady[idx]) {
          result += e + ' '
        }
      })
      toast.info(`참가자들이 준비하지 않았습니다 [${result}] `, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-startPeople',
        autoClose: 2000,
      })
    }
  }
  return (
    <>
      {!startCheck ? (
        <>
          {roomInfo?.userId == currentId ? (
            <DotButton
              black01
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
