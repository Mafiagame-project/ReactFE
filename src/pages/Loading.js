import { useHistory } from 'react-router-dom'
import { Grid, Text, Button } from '../element/index'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useEffect } from 'react'

function Loading() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = localStorage.getItem('token')

  const entrance = () => {
    history.push('/gamemain')
    const socket = io.connect('https://sparta-dongsun.shop')
    dispatch(gameActions.sendSocket(socket))

    socket.on('roomData', (info) => {
      // createModal 이벤트 발생시 실행
      socket.emit('joinRoom', info.roomId)
      console.log('info')
      dispatch(roomActions.currentRoom(info))
      history.push(`/gameroom/${info.roomId}`)
    })

    socket.on('leaveRoomMsg', (whosout, whosId) => {
      console.log(whosId)
      dispatch(memberActions.exitSocketId(whosout))
      dispatch(memberActions.exitUserId(whosId))
    })

    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      // 참가자가 방에 들어올때 호출
      console.log(currentAll)
      dispatch(memberActions.currentSocketId(idValue))
      dispatch(memberActions.currentUserId(currentAll))
    })

    socket.on('getJob', (player, playerJob) => {
      console.log(player, playerJob)
      dispatch(gameActions.playerJob({ player, playerJob }))
    })

    socket.on('isNight', (value) => {
      console.log(value + 'true면 밤입니다')
      dispatch(gameActions.dayAndNight(value))
    })

    socket.on('dayVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.id))
    })

    socket.on('nightVoteResult', (diedPeopleArr) => {
      console.log(diedPeopleArr)
      dispatch(gameActions.playerWhoKilled(diedPeopleArr))
    })

    socket.on('police', (selected) => {
      console.log(selected)
      dispatch(gameActions.copSelected(selected))
    })
  }

  return (
    <>
      <Grid width="100vw" height="100vh" bg="#eee">
        <Grid is_flex flex>
          {token ? (
            <Text
              _onClick={() => {
                entrance()
              }}
              bold
              size="32px"
            >
              게임시작
            </Text>
          ) : (
            <Grid is_flex flex>
              <Text
                _onClick={() => {
                  history.push('/login')
                }}
                bold
                size="32px"
              >
                로그인
              </Text>
              <Text
                _onClick={() => {
                  history.push('/signup')
                }}
                bold
                size="32px"
              >
                회원가입
              </Text>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}
export default Loading
