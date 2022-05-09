import React from 'react'
import ModalPortal from './ModalPortal'
import styled from 'styled-components'
//killed
const DeathNotiModal = ({ onClose }) => {
  return (
    <ModalPortal>
      <Background
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        <Content>nn님이 잡아먹혔습니다</Content>
      </Background>
    </ModalPortal>
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
  background-color: rgba(0, 0, 0, 0.7);
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
  padding: 50px;
  height: 400px;
  border-radius: 30px;
  max-width: 650px;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`

export default DeathNotiModal
