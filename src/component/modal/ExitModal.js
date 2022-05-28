import React from 'react'
import { history } from '../../redux/configureStore'
import styled from 'styled-components'
import { Grid, Text, DotButton } from '../../element/index'
import ModalPortal from './ModalPortal'
import question from '../../assets/image/noti/question.png'
import {clickSF} from '../../element/Sound'

const ExitModal = ({ onClose }) => {

  const exitRoom = () => {
    clickSF.play()
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
            <Grid padding="20px" height="100%" flexColumn_end>
              <Text size="25px" margin="0 0 3vw">
                {' '}
                정말 나가시겠어요??{' '}
              </Text>
              <img src={question} alt="나가기" />
              <Grid isFlex_center margin="20px 0 10px">
                <DotButton
                  white01
                  text="아니용"
                  _onClick={() => {
                    clickSF.play()
                    onClose()
                  }}
                />
                <DotButton black01 text="나가기" _onClick={exitRoom} />
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
  height: 430px;
  max-width: 430px;
  width: 100%;
  background-color: #eee;
  position: relative;
  border-radius: 10px;
`

export default ExitModal
