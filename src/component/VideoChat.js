import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import styled from 'styled-components'
import {actionCreators as postActions} from '../redux/modules/post';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Row = styled.div` 
display: flex; width: 150px; 
height: 150px; border-radius: 70%; overflow: hidden; 
` 
const Video = styled.video` 
width: 100%; height: 100%; 
object-fit: cover; `

function VideoChat(props) {
  const dispatch = useDispatch();
  const streamInfo = useSelector(state => state.post.video);
  const [yourID, setYourID] = useState('')
  const [users, setUsers] = useState({})
  const [getStream, setStream] = useState()

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = props.socket;

  const newPC = new RTCPeerConnection()
  const peer = new Peer({})
  useEffect(() => {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      dispatch(postActions.videoSetting(stream));
      if (userVideo.current) {
        userVideo.current.srcObject = stream
      }
    })

  }, [navigator])

  let UserVideo
  if (streamInfo) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />
  }

  return (
    <Container>
      <Row>
        {UserVideo}
      </Row>
      <Row>
        {Object.keys(users).map((key) => {
          if (key === yourID) {
            return null
          }
          return <button >Call {key}</button>
        })}
      </Row>
      <Row></Row>
    </Container>
  )
}

export default VideoChat
