import React from 'react'
import { history } from '../../redux/configureStore'
import ModalPortal from './ModalPortal'
import { Grid, Text, DotButton, Input, Image } from '../../element/index'
import styled from 'styled-components'

const EditProfileModal = ({ onClose }) => {
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
              <Text> 아이콘 변경 </Text>
              <Grid is_flex>
                <Image size={120} />
                <Image size={120} />
                <Image size={120} />
              </Grid>
              <Grid marign="40px 0 0">
                <DotButton black01 text="저장" />
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
  background-color: rgba(0, 0, 0, 0.4);
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
  height: 600px;
  max-width: 600px;
  width: 100%;
  background-color: #eee;
  position: relative;
  border-radius: 10px;
`

export default EditProfileModal
