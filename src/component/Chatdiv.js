import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

function Chatdiv({ getWrite, currentId, e }) {
  const copNoti = useSelector(state => state.game.copNoti)
  const chatRef = React.useRef(null)
  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(scrollToBottom, [getWrite])

  const Chatid = styled.div`
    text-align: ${e.data.id === currentId ? 'right' : 'left'};
    position: relative;
    right: ${e.data.id === currentId ? '2%' : '-2%'};
    color: black;
    font-size: 15px;
    margin-bottom: 5px;
  `
  const Chatword = styled.div`
    text-align: ${e.data.id === currentId ? 'right' : 'left'};
    position: relative;
    background: ${e.data.id === currentId ? '#FFE27A' : 'white'};
    border-radius: 5%;
    border: 1px solid black;
    padding: 10px;
    display: inline-block;
    right: ${e.data.id === currentId ? '2%' : '-2%'};
  `
  const PoliceChat = styled.div`
    text-align:center;
    position:relative;
    border-radius: 5%;
    border: 1px solid black;
    padding: 10px;
    display: inline-block;
  `
  const OneChat = styled.div`
    width: 100%;
    height: 50px;
    margin-top: 18px;
    text-align: ${e.data.id === currentId ? 'right' : 'left'};
  `
  return (
    <>
      <OneChat>
        {e.data.id !== currentId ? <Chatid>{e.data.id}</Chatid> : null}
        <Chatword>{e.data.msg}</Chatword>
        <div ref={chatRef} />
        <PoliceChat>{copNoti}</PoliceChat>
      </OneChat>
    </>
  )
}

export default Chatdiv
