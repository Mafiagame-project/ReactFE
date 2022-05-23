import { useHistory } from 'react-router-dom'
import { Grid, Text, Button, DotButton } from '../element/index'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import styled from 'styled-components'
import pop from '../assets/sound/effect/pop.wav'

function Loading() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = localStorage.getItem('token')
  const click = new Audio(pop)

  const entrance = () => {
    click.play()
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

    socket.on('leaveRoomMsg', (offSocketId, offId) => {
      dispatch(memberActions.exitSocketId(offSocketId))
      dispatch(memberActions.exitUserId(offId))
      dispatch(gameActions.noticeEnterOut(offId)) // 들어오고 나가고의 알림 없다면 삭제
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
      dispatch(roomActions.startCheck(true))
    })

    socket.on('dayVoteResult', (value) => {
      console.log('투표결과', value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr)) // 죽은 전체명단
      dispatch(gameActions.noticeResult(value.id)) // 방금 죽은사람
    })

    socket.on('ready', (value) => {
      console.log('레디', value)
      dispatch(gameActions.readyCheck(value)) // 게임시작 누르고 오는거라 필요없는듯?
    })

    socket.on('readyPeople', (currentReady) => {
      console.log('레디', currentReady)
      dispatch(roomActions.roomReady(currentReady)) // 레디한사람 전체 배열
    })

    socket.on('nightVoteResult', (value) => {
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResult(value.died[0]))
      dispatch(gameActions.playerWhoSurvived(value.saved[0]))
    })

    socket.on('endGame', (data) => {
      // 게임이 끝났을 때 노티
      dispatch(gameActions.noticeEndGame(data?.msg))
      dispatch(roomActions.startCheck(null))
    })

    socket?.on('reporterOver', () => {
      dispatch(gameActions.repChanceOver(true))
    })

    socket.on('reporter', (data) => {
      dispatch(gameActions.noticeRep(data))
    })
  }

  return (
    <div className="align_back loading">
      <Container>
        <Text margin="30px 0" size="90px">
          MAFIYANG
        </Text>

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
                {
                  history.push('/login')
                  click.play()
                }
              }}
            />
            <DotButton
              white03
              text="회원가입"
              _onClick={() => {
                {
                  history.push('/signup')
                  click.play()
                }
              }}
            />
          </>
        )}
      </Container>
    </div>
  )
}

const Container = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 99;
  width: 100%;
  position: relative;
`
export default Loading
