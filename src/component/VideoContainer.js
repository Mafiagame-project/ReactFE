import React, { useEffect, useRef, useState } from 'react'
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
      policeCnt++
    }
  }
  // --------- 여기서부터 peer -------------
  const videoGrid = useRef()
  const myVideo = document.createElement('video')
  // const myVideo = useRef();
  const peers = {}
  let getStream = null

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          let getStream = stream
          let streamId = stream.id

          addVideoStream(myVideo, stream)
          console.log('마이 스트림 받았쥬', stream)

          //못받아오는 부분
          myPeer.on('call', (call) => {
            console.log('콜 받아오는 중...', call)
            call.answer(stream)
            console.log('콜 수락ㅎㅎ', stream)
            const video = document.createElement('video')
            call.on('stream', (userVideoStream) => {
              console.log('상대방 스트림', userVideoStream)
              addVideoStream(video, userVideoStream)
              console.log('상대방 스트림 추가되었다')
            })
          })

          //여기서 부터 시작됨?
          socket.on('user-connected', (userId) => {
            console.log('새로운 커넥션 되었니?')
            connectToNewUser(userId, stream)
          })
        })
        .catch((error) => {})
    } catch (e) {
      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, getStream)
      })
      console.log(e, 'errr에러')
    }

    socket.on('user-disconnected', (userId) => {
      console.log('잘가요', userId)
      if (peers[userId]) peers[userId].close()
    })

    function connectToNewUser(userId, stream) {
      console.log(userId, stream)
      const call = myPeer.call(userId, stream)
      console.log('콜 요청 보내는 중...', call)
      const video = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
        console.log('콜 받고 스트림받음', stream)
      })
      call.on('close', () => {
        console.log('굿바이')
        video.remove()
      })

      peers[userId] = call
    }

    function addVideoStream(video, stream) {
      video.srcObject = stream
      console.log('비디오 추가 준비', video)
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      // videoGrid.current.prepend(video)
      // console.log(videoGrid)
    }
  }, [])

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
        {memberId.map((e) => {
          return (
            <Grid center>
              <div
                ref={videoGrid}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: '#eee',
                }}
                className="video-grid"
              >
                <button
                  onClick={() => {
                    active(e, playerJob, is_night)
                  }}
                >
                  선택하기
                </button>
              </div>
              <NameTag>{e}</NameTag>
            </Grid>
          )
        })}
      </Planet>
    </Container>
  )
}

const Container = styled.div`
  margin: 500px;
`
const Inner = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: #aaa;
`

const NameTag = styled.div`
  background-color: #eee;
  padding: 3px;
  margin: 10px;
`

export default VideoContainer
