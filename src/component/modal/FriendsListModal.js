import React from 'react'
import ModalPortal from './ModalPortal'
import { Grid, Text, Button } from '../../element/index'
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
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`

const Content = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 999;
  height: 280px;
  max-width: 420px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`

export default FriendlistModal
