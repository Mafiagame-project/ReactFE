import React from 'react'
import { Grid, Text, DotButton, Input } from '../../element/index'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../video.css'
import { actionCreators as gameActions } from '../../redux/modules/game'

const VoteModal = ({ onClose }) => {
  const [clickedId, setClickedId] = React.useState()
  const socket = useSelector((state) => state.game.socket)
  const is_night = useSelector((state) => state.game.night)
  const playerJob = useSelector((state) => state.game.job)
  let killed = useSelector((state) => state.game.killed)
  const chance = useSelector((state) => state.game.chance)
  const memberId = useSelector((state) => state.member.memberId)
  const currentNick = localStorage.getItem('userNick')

  if (killed == null) {
    killed = []
  }

  console.log(killed)
  let saveArray = memberId.filter((x) => !killed.includes(x))
  console.log(saveArray)

  const is_killed = (e) => {
    console.log(e.target.value)
    setClickedId(e.target.value)
  }
  // console.log(clickedId)
  // console.log(memberId)
  // console.log(playerJob)
  // console.log(is_night)

  const policePointed = (pointed, isMafia) => {
    if (isMafia === true) {
      toast.warning(`${pointed}는 마피아입니다`, {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-police',
        autoClose: 3000,
      })
    } else if (isMafia === false) {
      toast.warning(`${pointed}는 마피아가 아닙니다`, {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-police',
        autoClose: 3000,
      })
    } else {
      return null
    }
  }

  const actionAlert = (num) => {
    if (num === 1) {
      toast.warning('본인을 선택할 수 없습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-dup',
        autoClose: 2500,
      })
    } else if (num === 2) {
      toast.warning('이미 죽은사람을 선택할 수 없습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-dup',
        autoClose: 2500,
      })
      // } else if (num === 3) {
      //   toast.warning('당신은 죽었기때문에 선택할 수 없습니다', {
      //     position: toast.POSITION.TOP_LEFT,
      //     className: 'toast-dup',
      //     autoClose: 2500,
      //   })
    } else if (num === 4) {
      toast.warning('기회를 모두 사용하였습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-rep',
        autoClose: 2500,
      })
    }
  }

  const active = (clickedId, clicker, time) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    if (currentNick == clickedId) {
      actionAlert(1)
      return
    }
    if (killed?.length > 0) {
      killed.forEach((id) => {
        if (clickerId == id) {
          actionAlert(3)
          return onClose()
        }
        if (clickedId == id) {
          actionAlert(2)
          return onClose()
        } else {
          socket.emit('vote', { clickerJob, clickerId, clickedId })
          if (clickerJob == 'police' && time == true) {
            socket.on('police', (selected) => {
              policePointed(clickedId, selected)
            })
          } else if (clickerJob == 'reporter' && time == true) {
            if (chance == true) {
              actionAlert(4)
              return onClose()
            }
          }
          return onClose()
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
      if (clickerJob == 'police' && time == true) {
        socket.on('police', (selected) => {
          policePointed(clickedId, selected)
        })
      } else if (clickerJob == 'reporter' && time == true) {
        if (chance == true) {
          actionAlert(4)
          return onClose()
        }
      }
      return onClose()
    }
  }
  //밤에는 마피아 모달, 경찰, 의사 구분 주기
  //낮에는 통일

  //명단 죽은 사람만 추가

  return (
    <>
      {saveArray ? (
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
                  {saveArray?.map((e, i) => {
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
                  <>
                    <Text size="40px" color="#fff">
                      시민은..잠에 듭니다
                    </Text>
                    <DotButton
                      black04
                      text="다시 자러가기...zzZ"
                      _onClick={() => {
                        onClose()
                      }}
                    />
                  </>
                )}
                {playerJob.playerJob === 'citizen' ? null : (
                  <>
                    <VoteBox>
                      {saveArray?.map((e, i) => {
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
                    <Grid isFlex_center>
                      <DotButton
                        white01
                        text="선택 완료"
                        _onClick={() => {
                          active(clickedId, playerJob, is_night)
                        }}
                      />
                      <DotButton
                        black01
                        text="취소"
                        _onClick={() => {
                          onClose()
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Container>
            )}
          </Background>
        </ModalPortal>
      ) : null}
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
