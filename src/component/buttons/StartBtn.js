import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as gameActions } from '../../redux/modules/game'
import { history } from '../../redux/configureStore'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { DotButton, Grid } from '../../element/index'
import ReadyBtn from './ReadyBtn'
import VoteBtn from './VoteBtn'
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
  const [aiMode, setAiMode] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const toggleAiMode = () => {
    setAiMode(!aiMode)
  }
  const startGame = () => {
    if (aiMode) {
      alertSF.play()
      socket.emit('startGame', aiMode)
      dispatch(gameActions.noticeEndGame(null))
      setStart(true)
    }
    if (memberSocket.length < 4) {
      deniedSF.play()
      startGameNoti(1)
    } else {
      if (memberSocket.length - 1 === currentReady.length) {
        alertSF.play()
        socket.emit('startGame', aiMode)
        dispatch(gameActions.noticeEndGame(null))
        setStart(true)
      } else {
        deniedSF.play()
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
    if (!aiMode) {
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
  }
  return (
    <>
      {!endGame ? (
        <>
          {!startCheck ? (
            <>
              {roomInfo?.userId === currentId ? (
                <Grid isFlex_center>
                  <DotButton
                    black01
                    text="시작하기"
                    _onClick={() => {
                      startGame()
                    }}
                  />
                  <AiBtn
                    onMouseEnter={() => {
                      setHover(true)
                    }}
                    onMouseLeave={() => {
                      setHover(false)
                    }}
                  >
                    {hover ? (
                      <Info className={`${hover ? 'hover' : 'none'}`}>
                        인원이 없어도 괜찮아요! <br />
                        ai랑 게임하기
                      </Info>
                    ) : null}
                    <input
                      id="cb1"
                      type="checkbox"
                      name="모드"
                      onChange={toggleAiMode}
                    />
                    <label htmlFor="cb1"></label>
                    <span style={{ margin: '0 1vw', fontSize: '1.3vw' }}>
                      AI 모드
                    </span>
                  </AiBtn>
                </Grid>
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

const AiBtn = styled.div`
  cursor: pointer;
  width: 12vw;
  margin: 0 1vw;
  position: relative;
  text-align: center;
`

const Info = styled.div`
  transition: top 1s ease-in;
  background-color: #fff;
  border: 1px solid #000;
  padding: 5px;
  text-align: center;
  margin: 1vw 0;
  position: absolute;
  bottom: 80%;
  left: 15px;
  &.hover {
    animation-duration: 2s;
    animation-name: fadeout;
  }

  @keyframes fadeout {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

export default StartBtn
