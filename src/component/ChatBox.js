import React from 'react'
import Chatdiv from './Chatdiv'
import Timer from '../component/Timer'
import { Grid, Text, Button } from '../element/index'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const ChatBox = ({ socket }) => {
  const chatting = React.useRef()
  const chatRef = React.useRef(null)
  const [getWrite, setWrite] = React.useState([])
  const currentId = localStorage.getItem('userId')
  const currentTime = useSelector(state => state.game.night)

  const send = () => {
    // 채팅을 보낼 때 호출되는 함수
    let chatData = chatting.current.value
    socket.emit('msg', chatData)
    chatting.current.value = ''
  }

  React.useEffect(() => {
    socket.on('msg', (data) => {
      // 서버에서 오는 메세지 데이터를 받음
      setWrite((list) => [...list, { data }])
    })
  }, [socket])

  return (
    <>
      <Grid center width="400px">
        <Grid width="100%" height="5%">
          <Timer />
        </Grid>
        <Grid
          overflow="scroll"
          padding="10px 0 0 10px"
          bg="#F6F6F6"
          height="600px"
        >
          {getWrite.map((e) => {
            return <Chatdiv currentId={currentId} e={e} getWrite={getWrite} />
          })}
          <div ref={chatRef} />
        </Grid>
        <Grid isFlex_center padding="10px 0 0 0" height="15%">
          <ChatInput ref={chatting} placeholder="채팅 내용을 입력해주세요." />
          <Button
            chatBtn
            _onClick={() => {
              send()
            }}
          >
            보내기
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

// const Chatbox = styled.div`
//   width: 100%;
//   height: 70vh;
//   border-radius: 5%;
// `

const ChatInput = styled.input`
  margin: 0 10px 0 0;
  padding: 20px;
  border: none;
  width: 70%;
  background: #f6f6f6;
  &:focus {
    outline: none;
  }
`

export default ChatBox
