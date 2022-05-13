import React from 'react'
import Peer from 'peerjs'
import { useSelector } from 'react-redux'

const VideoContainer = () => {
  const socket = useSelector((state) => state.game.socket)

  const videoGrid = React.useRef()
  const myVideo = document.createElement('video')
  myVideo.muted = true
  const peers = {}
  //테스트
  
  React.useEffect(() => {
    const myPeer = new Peer()

    myPeer.on('open', (id) => {
      console.log(id)
      socket.emit('peerJoinRoom', id)
    })

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream)
        console.log('here')

        myPeer.on('call', (call) => {
          console.log('콜 찍히니?')
          call.answer(stream)
          const video = document.createElement('video')
          console.log('here')
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream)
            console.log('here')
          })
        })

        socket.on('user-connected', (userId) => {
          console.log(userId, stream)
          connectToNewUser(userId, stream)
          console.log('연결함수 실행완')
        })
      })

    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close()
    })

    function connectToNewUser(userId, myStream) {
      const call = myPeer.call(userId, myStream)
      const video = document.createElement('video')
      console.log('유저연결 실행')
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
        console.log('비디오 함수 실행완')
      })

      call.on('close', () => {
        console.log('삭제')
        video.remove()
      })

      peers[userId] = call
    }
  }, [])

  function addVideoStream(video, stream) {
    console.log(stream)
    video.srcObject = stream
    console.log(video)
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.current.append(video)
    console.log('추가완')
  }
  return (
    <>
      <div className="video_grid" ref={videoGrid} />
    </>
  )
}

export default VideoContainer
