import React from 'react'
import { history } from '../../redux/configureStore'
import ModalPortal from './ModalPortal'
import { actionCreators as gameActions } from '../../redux/modules/game'
import { actionCreators as roomActions } from '../../redux/modules/room'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Text, DotButton, Input, Image } from '../../element/index'
import styled from 'styled-components'

const ExitModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const exitRoom = () => {
    // 방에서 나가기 버튼을 누를때 호출
    socket.emit('leaveRoom')
    history.replace('/gamemain')
    dispatch(gameActions.noticeResult(null))
    dispatch(gameActions.playerWhoSurvived(null))
    dispatch(gameActions.dayAndNight(null))
    dispatch(gameActions.noticeEndGame(null))
    dispatch(gameActions.readyCheck(null))
    dispatch(gameActions.noticeJob(null))
    dispatch(roomActions.changeHost(null))
    dispatch(roomActions.roomReady(null))
  }
  return (
    <>
      <ModalPortal>
        <Background
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <Content onClick={(e) => e.stopPropagation()}>
            <Grid padding="30px" height="100%" flex_column>
              <Text> 정말 나가시겠어요?? </Text>
              <Grid marign="40px 0 0">
                <DotButton black01 text="나가기" _onClick={exitRoom} />
                <DotButton white01 text="아니용" _onClick={() => onClose()} />
              </Grid>
            </Grid>
          </Content>
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
  background-color: rgba(0, 0, 0, 0.8);
`

const Content = styled.div`
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  height: 400px;
  max-width: 300px;
  width: 100%;
  background-color: #eee;
  position: relative;
  border-radius: 10px;
`

export default ExitModal
