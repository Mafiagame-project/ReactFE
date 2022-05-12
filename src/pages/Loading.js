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
    socket.emit('roomList')
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })

    socket.on('roomData', (info) => {
      // createModal 이벤트 발생시 실행
      socket.emit('joinRoom', info.roomId)

      dispatch(roomActions.currentRoom(info))
      // dispatch(gameActions.sendPeerId(myPeer))
      history.replace(`/gameroom/${info.roomId}`)
    })

    socket.on('leaveRoomMsg', (whosout, whosId, host) => {
      //whosId
      console.log(host)
      dispatch(memberActions.exitSocketId(whosout))
      dispatch(memberActions.exitUserId(whosId))
      dispatch(gameActions.noticeEnterOut(whosId))
      dispatch(roomActions.changeHost(host))
    })

    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      // 참가자가 방에 들어올때 호출
      dispatch(memberActions.currentSocketId(idValue))
      dispatch(memberActions.currentUserId(currentAll))
      dispatch(gameActions.noticeEnterOut(incoming))
    })

    socket.on('getJob', (player, playerJob) => {
      console.log(player, playerJob)
      dispatch(gameActions.noticeJob(playerJob))
      dispatch(gameActions.playerJob({ player, playerJob }))
      dispatch(gameActions.startCard(true))
    })

    socket.on('isNight', (value) => {
      console.log(value)
      dispatch(gameActions.dayAndNight(value))
      // let time
      // if (value == true) {
      //   time = '밤'
      //   dispatch(gameActions.dayAndNight(time))
      // } else {
      //   time = '낮'
      //   dispatch(gameActions.dayAndNight(time))
      // }
    })

    socket.on('dayVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResult(value.id))
    })

    socket.on('ready', (value) => {
      console.log(value)
      dispatch(gameActions.readyCheck(value))
    })

    socket.on('readyPeople', (currentReady) => {
      console.log(currentReady)
      dispatch(roomActions.roomReady(currentReady))
    })

    socket.on('nightVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResult(value.died[0]))
      dispatch(gameActions.playerWhoSurvived(value.saved[0]))
    })

    socket.on('endGame', (data) => {
      // 게임이 끝났을 때 노티
      console.log(data)
      dispatch(gameActions.noticeEndGame(data?.msg))
    })

    socket.on('police', (selected) => {
      // 경찰이 밤에 선택했을때 전달받는 소켓
      console.log(selected)
      dispatch(gameActions.copSelected(selected))
      dispatch(gameActions.noticeCop(true))
    })

    socket.on('reporter', (data) => {
      //데이터가 Json 타입임 1번 기자가 고른사람의 직업, 2번 기자가 고른사람의 아이디 3번 기자가 고른사람이 누굴 찍었는지
      // 3번은 회의 후 지양할 것, 정체만 알면 될것같은데 누굴 찍었는지는 좀...
      console.log(data) // clickerJob, clickerId
      dispatch(gameActions.noticeRep(data))
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
