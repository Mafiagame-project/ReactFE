import React from 'react'
import { Grid, Text, DotButton, Input } from '../../element/index'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ModalPortal from './ModalPortal'

const VoteModal = ({ onClose, socket }) => {
  const is_night = useSelector((state) => state.game.night)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const copSelect = useSelector((state) => state.game.copSelect)
  const memberId = useSelector((state) => state.member.memberId)
  const currentId = localStorage.getItem('userId')

  // const is_killed = (e) => {}

  const active = (clickedId, clicker, time) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    let policeCnt = 0
    if (currentId == clickedId) {
      alert('다른사람을 뽑아주세요')
      return
    }
    console.log(killed)
    if (killed?.length > 0) {
      killed.forEach((id) => {
        if (clicker.player == id) {
          alert('죽었습니다')
          return
        } else {
          if (clickerJob == 'police') {
          }
          socket.emit('vote', { clickerJob, clickerId, clickedId })
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
    }
    if (clickerJob == 'police' && time == true && policeCnt == 0) {
      alert(`${clickedId}의 직업은 ${copSelect}입니다`)
      policeCnt++ // 아직 경찰이 어떻게 알림 받아서 사용할 지는 안정해짐.
    }
  }
  //밤에는 마피아 모달, 경찰, 의사 구분 주기
  //낮에는 통일

  return (
    <>
      <ModalPortal>
        <Background>
          {!is_night ? (
            <Container onClick={(e) => e.stopPropagation()}>
              <Text size="40px" color="#fff">
                낮이 되었습니다.
                <br />
                우리에 가둘 양을 선택해 주세요
              </Text>
              <VoteBox>
                <Input dayRadio text="최강마피아" value="vote" _name="vote" />
                <Input dayRadio text="지존마피아" value="vote" _name="vote" />
                <Input dayRadio text="지존마피아" value="vote" _name="vote" />
                <Input dayRadio text="지존마피아" value="vote" _name="vote" />
              </VoteBox>
              <DotButton
                white02
                text="투표 완료"
                _onClick={() => {
                  active(e, playerJob, is_night)
                }}
              />
            </Container>
          ) : (
            <Container onClick={(e) => e.stopPropagation()}>
              {playerJob === mafia ? (
                <Text size="40px" color="#fff">
                  밤이 되었습니다.
                  <br />
                  잡아먹고 싶은 양을 선택해 주세요
                </Text>
              ) : playerJob === cop ? (
                <Text size="40px" color="#fff">
                  밤이 되었습니다.
                  <br />
                  정체를 알고싶은 양을 선택해 주세요
                </Text>
              ) : playerJob === doctor ? (
                <Text size="40px" color="#fff">
                  밤이 되었습니다.
                  <br />
                  살리고 싶은 양을 선택해 주세요
                </Text>
              ) : null}

              <VoteBox>
                <Input
                  radio
                  text="최강마피아"
                  value="유저아이디"
                  _name="vote"
                  _onChange={is_killed}
                />
                <Input radio text="지존마피아" value="vote" _name="vote" />
                <Input radio text="지존마피아" value="vote" _name="vote" />
                <Input radio text="지존마피아" value="vote" _name="vote" />
              </VoteBox>
              <DotButton
                white02
                text="선택 완료"
                _onClick={() => {
                  active(e, playerJob, is_night)
                }}
              />
            </Container>
          )}
        </Background>
      </ModalPortal>
    </>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.9);
`

const Container = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const VoteBox = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  max-width: 600px;
  margin: 100px auto;
`

export default VoteModal
