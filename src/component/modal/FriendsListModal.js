import React from 'react'
import ModalPortal from './ModalPortal'
import { Grid, Text, Button, Input } from '../../element/index'
import styled from 'styled-components'

const FriendlistModal = ({ onClose }) => {
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
            <Text>친구 리스트</Text>
            <Input placeholder="아이디/이메일을 입력하세요" width="100%" />
            <Button _onClick={() => onClose()}>X</Button>
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
  background-color: rgba(0, 0, 0, 0.5);
`

const Content = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
  height: 610px;
  max-width: 410px;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`

export default FriendlistModal
