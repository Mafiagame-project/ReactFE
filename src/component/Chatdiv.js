import React from 'react'
import styled from 'styled-components'

function Chatdiv({ getWrite, currentId, e }) {
  const chatRef = React.useRef(null)
  const id = e.data.id

  // useRef를 만들어서 최근에 입력된 (받아온) 메세지 데이터로 화면을 이동시킴
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  // getWrite에 해당 게임룸에 메세지 데이터가 담겨있음
  React.useEffect(scrollToBottom, [getWrite])

  return (
    <>
      <OneChat isMe={id === currentId}>
        {id !== currentId ? (
          <Chatid isMe={id === currentId}>{id}</Chatid>
        ) : null}
        <Chatword isMe={id === currentId}>{e.data.msg}</Chatword>
        <div ref={chatRef} />
      </OneChat>
    </>
  )
}

const Chatid = styled.div`
    text-align: ${(props) => (props.isMe ? 'right' : 'left')}
    position: relative;
    right: ${(props) => (props.isMe ? '2%' : '-2%')};
    color: black;
    font-size: 15px;
    margin-bottom: 5px;
  `
const Chatword = styled.div`
  text-align: ${(props) => (props.isMe ? 'right' : 'left')}
    position: relative;
    background: ${(props) => (props.isMe ? '#FFEE59' : 'white')};
    border-radius: 5px;
    border: 1px solid black;
    padding: 10px;
    display: inline-block;
    right: ${(props) => (props.isMe ? '2%' : '-2%')};
  `

const OneChat = styled.div`
  width: 100%;
  margin-top: ${(props) => (props.isMe ? '10px' : '22px')};
  text-align: ${(props) => (props.isMe ? 'right' : 'left')};
`
export default Chatdiv
