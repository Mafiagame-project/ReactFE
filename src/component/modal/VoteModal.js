import React from 'react'
import { Grid, Text, DotButton, Input } from '../../element/index'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../video.css'

const VoteModal = ({ onClose }) => {
  const [clickedId, setClickedId] = React.useState()
  const socket = useSelector((state) => state.game.socket)
  const is_night = useSelector((state) => state.game.night)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const copSelect = useSelector((state) => state.game.copSelect)
  const memberId = useSelector((state) => state.member.memberId)
  const currentId = localStorage.getItem('userId')

  const is_killed = (e) => {
    console.log(e.target.value)
    setClickedId(e.target.value)
  }
  console.log(clickedId)
  console.log(memberId)
  console.log(playerJob)
  console.log(is_night)

  const policePointed = (pointed, hisJob) => {
    toast.warning(`${pointed}의 정체는 ${hisJob}입니다`, {
      position: toast.POSITION.TOP_LEFT,
      className: 'toast-police',
      autoClose: 3000,
    })
  }

  const active = (clickedId, clicker, time) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
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
          return onClose()
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
      return onClose()
    }
    if (clickerJob == 'police' && time == true) {
      console.log(clickerJob, clickedId, copSelect)
      policePointed(clickedId, copSelect)
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
                {memberId.map((e, i) => {
                  return (
                    <Input
                      key={i}
                      dayRadio
                      text={e}
                      value={e}
                      _name="vote"
                      _onChange={is_killed}
                    />
                  )
                })}
              </VoteBox>
              <ToastContainer />
              <Text color="#fff" size="25px">
                {clickedId}님을 선택하시겠습니까?
              </Text>
              <Grid isFlex_center>
                <DotButton
                  white02
                  margin="0 5px"
                  text="투표 완료"
                  _onClick={() => {
                    active(clickedId, playerJob, is_night)
                  }}
                />
                <DotButton
                  black02
                  margin="0 5px"
                  text="취소"
                  _onClick={() => {
                    onClose()
                  }}
                />
              </Grid>
            </Container>
          ) : (
            <Container onClick={(e) => e.stopPropagation()}>
              {playerJob.playerJob === 'mafia' ? (
                <Text size="40px" color="#fff">
                  밤이 되었습니다.
                  <br />
                  잡아먹고 싶은 양을 선택해 주세요
                </Text>
              ) : playerJob.playerJob === 'police' ? (
                <Text size="40px" color="#fff">
                  밤이 되었습니다.
                  <br />
                  정체를 알고싶은 양을 선택해 주세요
                </Text>
              ) : playerJob.playerJob === 'doctor' ? (
                <Text size="40px" color="#fff">
                  밤이 되었습니다.
                  <br />
                  살리고 싶은 양을 선택해 주세요
                </Text>
              ) : (
                <Text size="40px" color="#fff">
                  시민은..잠에 듭니다
                </Text>
              )}
              <VoteBox>
                {memberId.map((e, i) => {
                  return (
                    <Input
                      key={i}
                      radio
                      text={e}
                      value={e}
                      _name="vote"
                      _onChange={is_killed}
                    />
                  )
                })}
              </VoteBox>
              <DotButton
                white02
                text="선택 완료"
                _onClick={() => {
                  active(clickedId, playerJob, is_night)
                }}
              />
              <DotButton
                black02
                text="취소"
                _onClick={() => {
                  onClose()
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
  max-width: 800px;
  margin: 100px auto;
`

export default VoteModal
