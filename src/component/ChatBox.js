import React from 'react'
import Chatdiv from './Chatdiv'
import Timer from './Timer'
import { Grid, Text, Button } from '../element/index'

import styled from 'styled-components'
import { useSelector } from 'react-redux'

const ChatBox = ({ socket }) => {
  const chatting = React.useRef()
  const chatRef = React.useRef(null)
  const [getWrite, setWrite] = React.useState([])
  const currentId = localStorage.getItem('userNick')
  const currentTime = useSelector((state) => state.game.night)

  const send = () => {
    // 채팅을 보낼 때 호출되는 함수
    let chatData = chatting.current.value
    socket.emit('msg', chatData)
    chatting.current.value = ''
  }

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      send()
    }
  }

  React.useEffect(() => {
    socket.on('msg', (data) => {
      // 서버에서 오는 메세지 데이터를 받음
      setWrite((list) => [...list, { data }])
    })
  }, [socket])

  return (
    <Grid center width="">
      <Timer />
      <ChatContainer>
        <Chatbox>
          {getWrite.map((e, i) => {
            return (
              <Chatdiv
                key={i}
                currentId={currentId}
                e={e}
                getWrite={getWrite}
              />
            )
          })}
          <div ref={chatRef} />
          <TextContainer>
            <ChatInput
              ref={chatting}
              onKeyPress={onKeyPress}
              placeholder="채팅 내용을 입력해주세요."
            />
            <Button
              chatBtn
              _onClick={() => {
                send()
              }}
            >
              보내기
            </Button>
          </TextContainer>
        </Chatbox>
      </ChatContainer>
    </Grid>
  )
}

const ChatContainer = styled.div`
  position: relative;
  height: 75vh;
  margin: 0 1.17vw;
  min-width: 400px;
  box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #f6f6f6;
`

const Chatbox = styled.div`
  padding: 18px;
  height: calc(100% - 150px);
  overflow: scroll;
`

const TextContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 92%;
  left: 50%;
  transform: translateX(-50%);
`

const ChatInput = styled.input`
  padding: 20px;
  border: none;
  width: 70%;
  &:focus {
    outline: none;
  }
`

export default ChatBox
