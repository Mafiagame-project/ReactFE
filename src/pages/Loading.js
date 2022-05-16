import { useHistory } from 'react-router-dom'
import { Grid, Text, Button, DotButton } from '../element/index'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useEffect } from 'react'
import styled from 'styled-components'

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
      history.replace(`/gameroom/${info.roomId}`)
    })

    socket.on('leaveRoomMsg', (offSocketId, offId, host) => {
      dispatch(memberActions.exitSocketId(offSocketId))
      dispatch(memberActions.exitUserId(offId))
      dispatch(gameActions.noticeEnterOut(offId)) // 들어오고 나가고의 알림 없다면 삭제
      dispatch(roomActions.changeHost(host))
    })

    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      // 참가자가 방에 들어올때 호출
      dispatch(memberActions.currentSocketId(idValue))
      dispatch(memberActions.currentUserId(currentAll))
      dispatch(gameActions.noticeEnterOut(incoming)) // 들어오고 나가고의 알림 없다면 삭제
    })

    socket.on('getJob', (player, playerJob) => {
      dispatch(gameActions.noticeJob(playerJob))
      dispatch(gameActions.playerJob({ player, playerJob }))
      dispatch(gameActions.startCard(true))
    })

    socket.on('isNight', (value) => {
      dispatch(gameActions.dayAndNight(value))
      dispatch(gameActions.dayCount())
    })

    socket.on('dayVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr)) // 죽은 전체명단
      dispatch(gameActions.noticeResult(value.id)) // 방금 죽은사람
    })

    socket.on('ready', (value) => {
      dispatch(gameActions.readyCheck(value)) // 게임시작 누르고 오는거라 필요없는듯?
    })

    socket.on('readyPeople', (currentReady) => {
      dispatch(roomActions.roomReady(currentReady)) // 레디한사람 전체 배열
    })

    socket.on('nightVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResult(value.died[0]))
      dispatch(gameActions.playerWhoSurvived(value.saved[0]))
    })

    socket.on('endGame', (data) => {
      // 게임이 끝났을 때 노티
      dispatch(gameActions.noticeEndGame(data?.msg))
    })

    socket?.on('reporterOver', () => {
      dispatch(gameActions.repChanceOver(true))
    })

    socket.on('reporter', (data) => {
      //데이터가 Json 타입임 1번 기자가 고른사람의 직업, 2번 기자가 고른사람의 아이디 3번 기자가 고른사람이 누굴 찍었는지
      // 3번은 회의 후 지양할 것, 정체만 알면 될것같은데 누굴 찍었는지는 좀...
      dispatch(gameActions.noticeRep(data))
    })
  }

  return (
    <>
      <Container>
        <Text size="80px">MAFIYANG</Text>

        {token ? (
          <DotButton
            black03
            text="게임시작"
            _onClick={() => {
              entrance()
            }}
          />
        ) : (
          <>
            <DotButton
              black03
              text="로그인"
              _onClick={() => {
                history.push('/login')
              }}
            />
            <DotButton
              white03
              text="회원가입"
              _onClick={() => {
                history.push('/signup')
              }}
            />
          </>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  text-align: center;
  margin-top: 200px;
`
export default Loading
