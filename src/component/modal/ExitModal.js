import React from 'react'
import { history } from '../../redux/configureStore'
import ModalPortal from './ModalPortal'
import { Grid, Text, DotButton, Input, Image } from '../../element/index'
import styled from 'styled-components'

const ExitModal = ({ onClose, socket }) => {
  const exitRoom = () => {
    // 방에서 나가기 버튼을 누를때 호출
    socket.emit('leaveRoom')
    history.replace('/gamemain')
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
            <Text> 정말 나가시겠어요?? </Text>
            <DotButton black01 text="나가기" _onClick={() => exitRoom()} />
            <DotButton white01 text="아니용" _onClick={() => onClose()} />
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
`

export default ExitModal
