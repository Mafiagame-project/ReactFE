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

  // safari 브라우저 진입막기
  React.useEffect(() => {
    const safariSearch = window.navigator.userAgent.toLowerCase()
    const safari = safariSearch.indexOf('safari')
    const chrome = safariSearch.indexOf('chrome')
    if (safari > 1 && chrome == -1) {
      alert('죄송합니다 Safari 브라우저는 지원하지 않습니다')
      window.location = '/'
    }
  }, [])

  // 게임 여러곳에서 사용되는 소켓들을 한꺼번에 모아서 이벤트 중복발생을 방지했다.
  const entrance = () => {
    accessSF.play()
    history.push('/gamemain')
    const socket = io.connect('https://sparta-dongsun.shop')
    dispatch(gameActions.sendSocket(socket))
    // 전체 게임방 리스트 불러오는 소켓
    socket.emit('roomList')
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms)) // 방 인원, 최대인원, 방장, 방 ID 등
    })

    // 게임방 입장하면서 해당 게임방의 데이터를 받아옴
    socket.on('roomData', (info) => {
      socket.emit('joinRoom', info.roomId)
      dispatch(roomActions.currentRoom(info))
      history.replace(`/gameroom/${info.roomId}`)
    })

    // 유저가 게임방을 나가면 불러오는 소켓 (해당방에 있는 사람 소켓ID, 명단배열)
    socket.on('leaveRoomMsg', (offSocketId, offId) => {
      dispatch(memberActions.exitSocketId(offSocketId))
      dispatch(memberActions.exitUserId(offId))
    })

    // 유저가 게임방에 들어오면 불러오는 소켓 (방금들어온 사람, 해당방에 있는 사람 소켓ID, 명단배열)
    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      dispatch(memberActions.currentSocketId(idValue))
      dispatch(memberActions.currentUserId(currentAll))
    })

    // 게임시작시 참가자들에게 직업을 부여하는 소켓 (플레이어, 직업)
    socket.on('getJob', (player, playerJob) => {
      dispatch(gameActions.noticeJob(playerJob))
      dispatch(gameActions.playerJob({ player, playerJob }))
      dispatch(gameActions.startCard(true)) // 직업부여 카드를 띄우기위한 장치
      dispatch(roomActions.startCheck(true))
      startBgm.volume = 0.22
      startBgm.play()
    })

    // 낮의 투표결과를 보여주는 소켓
    socket.on('dayVoteResult', (value) => {
      dispatch(gameActions.checkIsMafia(value.isMafia)) // 방금 죽은사람이 마피아인지 여부
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr)) // 죽은 전체명단
      dispatch(gameActions.noticeResult(value.id)) // 방금 죽은사람
    })

    // 해당 게임룸의 레디한 사람 전체 배열
    socket.on('readyPeople', (currentReady) => {
      dispatch(roomActions.roomReady(currentReady)) // 레디한사람 전체 배열
    })

    // 밤의 행동결과를 보여주는 소켓
    socket.on('nightVoteResult', (value) => {
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr)) // 죽은 전체명단
      dispatch(gameActions.noticeResultNight(value.died[0])) // 방금 죽은사람
      dispatch(gameActions.playerWhoSurvived(value.saved[0])) // 살아있는 사람 명단
    })

    // 게임이 끝났을 때를 알려주는 소켓
    socket.on('endGame', (data) => {
      dispatch(gameActions.noticeEndGame(data?.msg)) // 게임끝남을 알려주는 노티 장치
      dispatch(roomActions.startCheck(null))
      startBgm.currentTime = 0
      startBgm.pause()
    })

    // 리포터 기회가 끝났으면 작동되는 소켓
    socket?.on('reporterOver', () => {
      dispatch(gameActions.repChanceOver(true))
    })

    // 리포터가 지목한 사람의 데이터 정보를 담고있는 소켓
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
