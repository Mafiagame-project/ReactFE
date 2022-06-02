import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Chatdiv from './Chatdiv'
import Timer from './Timer'
import { Grid } from '../element/index'
import lock from '../assets/icons/white/자물쇠(백).png'

// 채팅창 컴포넌트
const ChatBox = ({ socket, currentTime }) => {
  const chatting = React.useRef()
  const chatRef = React.useRef(null)
  const [getWrite, setWrite] = React.useState([])
  const currentId = localStorage.getItem('userNick')
  const playerJob = useSelector((state) => state.game.job)
  const endGame = useSelector((state) => state.game.endGameNoti)

  // 채팅을 보낼 때 호출되는 함수
  const send = () => {
    let chatData = chatting.current.value
    if (chatData === '') { // 채팅을 못치면 submit이 안됩니다.
      return null
    }
    // 서버로 메세지 데이터 전송
    socket.emit('msg', chatData)
    chatting.current.value = ''
  }

  // 채팅 엔터
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      send()
    }
  }

  React.useEffect(() => {
    socket.on('msg', (data) => {
      // 서버에서 오는 메세지 데이터를 스테이트로 관리했음
      setWrite((list) => [...list, { data }])
    })
  }, [socket])

  return (
    <Grid padding="5vh 0 0 0" center width="25%" margin="0 5vw 0 2vw">
      <Timer />
      <ChatContainer>
        {currentTime && endGame == null && playerJob?.playerJob !== 'mafia' ? (
          <Block>
            <div className="block_bg"></div>
            <img src={lock} alt="밤이라서 채팅금지" />
          </Block>
        ) : null}
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
        </Chatbox>
        <hr style={{ width: '92%', margin: '0 auto', color: '#eee' }} />
        <TextContainer>
          <ChatInput
            ref={chatting}
            onKeyPress={onKeyPress}
            placeholder="채팅 내용을 입력해주세요."
          />
          <Span
            onClick={() => {
              send()
            }}
          >
            보내기
          </Span>
        </TextContainer>
      </ChatContainer>
    </Grid>
  )
}

const ChatContainer = styled.div`
  position: relative;
  height: 70vh;
  min-width: 24vw;
  box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
  box-sizing: border-box;
  background-color: #f6f6f6;
`

const Chatbox = styled.div`
  padding: 25px;
  height: calc(100% - 125px);
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
  padding: 0 10px;
  height: 5vh;
  border: none;
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  &:focus {
    outline: none;
  }
`
const Span = styled.span`
  position: absolute;
  height: 5vh;
  align-items: center;
  justify-content: center;
  display: flex;
  top: 0;
  right: 0;
  padding: 0 10px;
  background-color: #000;
  color: #fff;
  border-radius: 0 8px 8px 0;
`

const Block = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  text-align: center;
  z-index: 1;
  > .block_bg {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.6;
  }
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    opacity: 1;
    z-index: 1;
  }
`

export default ChatBox
