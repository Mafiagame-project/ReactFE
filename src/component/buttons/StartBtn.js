import React, { useEffect } from 'react'
import { DotButton } from '../../element/index'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/configureStore'
import { toast } from 'react-toastify'
import ReadyBtn from './ReadyBtn'
import VoteBtn from './VoteBtn'
import { actionCreators as gameActions } from '../../redux/modules/game'
import { alertSF, deniedSF } from '../../element/Sound'

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

  console.log(members)

  const startGame = () => {
    // if (memberSocket.length < 4) {
    //   deniedSF.play()
    //   startGameNoti(1)
    // } else {
    if (memberSocket.length - 1 === currentReady.length) {
      alertSF.play()
      socket.emit('startGame')
      dispatch(gameActions.noticeEndGame(null))
      setStart(true)
    } else {
      deniedSF.play()
      startGameNoti(2)
    }
    // }
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
    }
  }, [startCard])

  useEffect(() => {
    if (endGame !== null) {
      setTimeout(() => {
        whenGameOff()
      }, 5000)
    }
  }, [endGame])

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
    deniedSF.play()
    toast.warning('호스트가 방을 나갔습니다!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-host-out',
      autoClose: 1000,
    })
  }
  const whenGameOff = () => {
    toast.warning(
      '게임이 종료되었습니다! 다시 게임을 진행하시려면 새로운 방을 만들어주세요!',
      {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-host-out',
        autoClose: 10000,
      },
    )
  }

  const startGameNoti = (count) => {
    if (count === 1) {
      deniedSF.play()
      toast.info('게임시작을 위해서 최소 4명이상이 필요합니다', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-startPeople',
        autoClose: 2000,
      })
    } else {
      let withOutHost = members.filter((nick) => nick !== roomInfo?.userId)
      let result = ''
      let array = []
      for (let i = 0; i < withOutHost.length; i++) {
        if (currentReady.includes(withOutHost[i]) === false) {
          console.log(withOutHost[i])
          array.push(withOutHost[i])
        }
        result = array.join(', ')
      }
      deniedSF.play()
      toast.info(`참가자들이 준비하지 않았습니다 [${result}] `, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-startPeople',
        autoClose: 2000,
      })
    }
  }
  return (
    <>
      {!endGame ? (
        <>
          {!startCheck ? (
            <>
              {roomInfo?.userId === currentId ? (
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
          )}{' '}
        </>
      ) : null}
    </>
  )
}

export default StartBtn
