import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import styled from 'styled-components'
import { Grid, Text, DotButton } from '../element/index'
import logo from '../assets/logo/기본값.png'
import { clickSF, accessSF } from '../element/Sound'
import bgm from '../assets/sound/bgm/big_helmet.mp3'
function Loading() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = localStorage.getItem('token')
  const startBgm = new Audio(bgm)
  startBgm.loop = true

  //safari 막기
  React.useEffect(() => {
    const safariSearch = window.navigator.userAgent.toLowerCase()
    const safari = safariSearch.indexOf('safari')
    const chrome = safariSearch.indexOf('chrome')
    if (safari > 1 && chrome == -1) {
      alert('죄송합니다 Safari 브라우저는 지원하지 않습니다')
      window.location = '/'
    }
  }, [])

  const entrance = () => {
    accessSF.play()
    history.push('/gamemain')
    const socket = io.connect('https://sparta-dongsun.shop')
    dispatch(gameActions.sendSocket(socket))
    socket.emit('roomList')
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })

    socket.on('roomData', (info) => {
      socket.emit('joinRoom', info.roomId)
      dispatch(roomActions.currentRoom(info))
      history.replace(`/gameroom/${info.roomId}`)
    })

    socket.on('leaveRoomMsg', (offSocketId, offId) => {
      dispatch(memberActions.exitSocketId(offSocketId))
      dispatch(memberActions.exitUserId(offId))
    })

    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      dispatch(memberActions.currentSocketId(idValue))
      dispatch(memberActions.currentUserId(currentAll))
    })

    socket.on('getJob', (player, playerJob) => {
      dispatch(gameActions.noticeJob(playerJob))
      dispatch(gameActions.playerJob({ player, playerJob }))
      dispatch(gameActions.startCard(true))
      dispatch(roomActions.startCheck(true))
      startBgm.volume = 0.22
      startBgm.play()
    })

    socket.on('dayVoteResult', (value) => {
      dispatch(gameActions.checkIsMafia(value.isMafia))
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr)) // 죽은 전체명단
      dispatch(gameActions.noticeResult(value.id)) // 방금 죽은사람
    })

    socket.on('readyPeople', (currentReady) => {
      dispatch(roomActions.roomReady(currentReady)) // 레디한사람 전체 배열
    })

    socket.on('nightVoteResult', (value) => {
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResultNight(value.died[0]))
      dispatch(gameActions.playerWhoSurvived(value.saved[0]))
    })

    socket.on('endGame', (data) => {
      // 게임이 끝났을 때 노티
      dispatch(gameActions.noticeEndGame(data?.msg))
      dispatch(roomActions.startCheck(null))
      startBgm.currentTime = 0
      startBgm.pause()
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
        <img src={logo} alt="로고" style={{ margin: '1vw 0' }} />
        {token ? (
          <div className="blank">
            <DotButton
              black03
              text="게임시작"
              _onClick={() => {
                entrance()
              }}
            />
          </div>
        ) : (
          <>
            <DotButton
              black03
              text="로그인"
              _onClick={() => {
                history.push('/login')
                clickSF.play()
              }}
            />
          </>
        )}

        <Grid margin="2vw 0 0">
          <Text size="20px" bold>
            {' '}
            Copyright @2022 MAFIYANG.All rights reserved.
          </Text>
          <Grid isDisplay="flex" width="370px" margin="1vw auto">
            <Grid flexColumn>
              <Text bold size="20px" margin="0.3vw 0">
                BACK_END
              </Text>
              <Text size="18px">김동선</Text>
              <Text size="18px" margin="0.3vw 0">
                이현승
              </Text>
            </Grid>
            <Grid flexColumn>
              <Text bold size="20px" margin="0.3vw 0">
                FRONT_END
              </Text>
              <Text size="18px">김지나</Text>
              <Text size="18px" margin="0.3vw 0">
                조찬익
              </Text>
            </Grid>
            <Grid fc>
              <Text bold size="20px" margin="0.3vw 0">
                DESINGER
              </Text>
              <Text size="18px">김지수</Text>
            </Grid>
          </Grid>
          <Grid isFlex_center margin="1vw 0">
            <Text
              _cursor
              size="14px"
              color="#aaa"
              margin="0 1vw"
              _onClick={() => {
                history.push('/information')
              }}
            >
              개인정보보호 약관
            </Text>
            <Text
              _cursor
              margin="0 1vw"
              size="14px"
              color="#aaa"
              _onClick={() => {
                window.open('https://www.instagram.com/mafiyang7')
              }}
            >
              Instagram @mafiyang7
            </Text>
          </Grid>
        </Grid>
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
  margin-top: 50px;
`
export default Loading
