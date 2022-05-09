import React from 'react'
import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import { Grid, Text } from '../../element/index'
//아직 더미만 넣어놨습니닷

const JobModal = () => {
  const roles = [
    {
      id: 1,
      role: '시민양',
      dese: '아무 능력이 없어요...',
      image: '',
    },
    {
      id: 2,
      role: '마피양',
      dese: '밤마다 양을 잡아먹을 수 있어요',
      image: '',
    },
    {
      id: 3,
      role: '의사양',
      dese: '밤마다 한명을 치료해줄 수 있어요',
      image: '',
    },
    {
      id: 4,
      role: '경찰양',
      dese: '한사람의 정체를 밝혀낼 수 있어요',
      image: '',
    },
  ]

  return (
    <>
      <ModalPortal>
        <Background>
          <Text> 당신의 직업은...</Text>
          <Content>
            <Grid>{roles[0].role}</Grid>
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
  padding: 30px;
  height: 405px;
  max-width: 290px;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: scroll;
`

export default JobModal
