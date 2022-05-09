import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'
import Peer from 'peerjs'
import '../shared/video.css'

const VideoContainer = (props) => {
  const socket = props.socket
  const memberId = useSelector((state) => state.member.memberId)
  const myPeer = useSelector((state) => state.game.peerId)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const copSelect = useSelector((state) => state.game.copSelect)
  const is_night = useSelector((state) => state.game.night)
  const roomInfo = useSelector((state) => state.room.current)
  const currentId = localStorage.getItem('userId')

  const active = (clickedId, clicker, time) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    let policeCnt = 0
    if (currentId == clickedId) {
      alert('다른사람을 뽑아주세요')
      return
    }
    console.log(killed)
    if (killed?.length > 0) {
      killed.forEach((id) => {
        if (clicker.player == id) {
          alert('죽었습니다')
          return
        } else {
          if (clickerJob == 'police') {
          }
          socket.emit('vote', { clickerJob, clickerId, clickedId })
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
    }
    if (clickerJob == 'police' && time == true && policeCnt == 0) {
      alert(`${clickedId}의 직업은 ${copSelect}입니다`)
      policeCnt++ // 아직 경찰이 어떻게 알림 받아서 사용할 지는 안정해짐.
    }
  }
  // --------- 여기서부터 peer -------------

  // const myVideo = document.createElement('video')
  let myVideo = useRef()
  let myStream = null
  let myPeerId = ''
  let streamId = null
  const peers = {}
  const videoGrid = useRef()
  const videoContainer = useRef()
  // const getStream = useRef()
  // const allStream = useRef()
  const { roomId } = useParams()
  console.log(roomId)

  // const myPeer = new Peer()

  useEffect(() => {
  try{
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        myStream = stream
        console.log(myVideo.current, stream)
        addVideoStream(myVideo.current, myStream)
        videoGrid.current.prepend(myVideo.current)
        console.log('마이 스트림 받았음', stream)
      })
      .catch((error) => {
        console.log('통신err', error)
      })
    } catch {
  }
    socket.on('user-disconnected', (userId) => {
      console.log('잘가요', userId)
      if (peers[userId]) peers[userId].close()
    })
  }, [])

  function addVideoStream(video, stream) {
    video.srcObject = stream
    console.log('비디오 추가 준비', video)
    video.addEventListener('loadedmetadata', () => {
      video.play() //이벤트리스너 추가되었는지 확인
    })
    // videoGrid.current.prepend(video)
  }
  return (
    <Container>
      <Planet
        orbitStyle={(defaultStyle) => ({
          ...defaultStyle,
          borderWidth: 0.1,
          borderStyle: 'dashed',
          borderColor: '#aaa',
        })}
        tension={100}
        orbitRadius={300}
        centerContent={
          <div
            style={{
              height: 100,
              width: 100,
              borderRadius: '50%',
            }}
          />
        }
        open
      >
        {memberId.map((e, i) => {
          return (
            <Grid key={i} center>
              <div id="video-grid" ref={videoContainer}>
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: '#eee',
                  }}
                  className="video_box"
                  ref={videoGrid}
                >
                  <video style={{ objectFit: 'cover' }} ref={myVideo}></video>
                  <div>
                    <button
                      onClick={() => {
                        active(e, playerJob, is_night)
                      }}
                    >
                      선택하기
                    </button>
                    <NameTag>{e}</NameTag>
                  </div>
                </div>
              </div>
            </Grid>
          )
        })}
      </Planet>
    </Container>
  )
}

const Container = styled.div``
const Inner = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: #aaa;
  object-fit: cover;
`

const NameTag = styled.div`
  background-color: #eee;
  padding: 3px;
  margin: 10px;
`

export default VideoContainer
