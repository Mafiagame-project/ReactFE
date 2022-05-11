import React from 'react'
import Peer from 'peerjs'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './video.css';

const VideoContainer = () => {
  // const myPeer = useSelector((state) => state.game.peerId)
  const socket = useSelector(state => state.game.socket)
  let myStream = null
  let myPeerId = ''
  
  const videoGrid = React.useRef()
  // const myPeer = new Peer()
  const myVideo = document.createElement('video')
  myVideo.classList.add('video_box')
  myVideo.muted = true
  const peers = {}
  
  const { roomId } = useParams()
  
  React.useEffect(() => {
    const myPeer = new Peer()
    myPeer.on('open', (id) => {
      console.log(id)  // 6번
      socket.emit('peerJoinRoom', id)
    })

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        myStream = stream
        addVideoStream(myVideo, stream)
        console.log('here')  // 5번


        myPeer.on('call', (call) => {
          console.log('콜 찍히니?')  //10번
          call.answer(stream)
          const video = document.createElement('video')
          video.classList.add('video_box')
          console.log('here')  // 11번
          call.on('stream', (userVideoStream) => {
            addVideoStream(video, userVideoStream)
            console.log('here') // 15번
          })
        })

        socket.on('user-connected', (userId) => {
          console.log(userId, stream)  //7번
          connectToNewUser(userId, stream)
          console.log('연결함수 실행완')  //9번
        })
      })

    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close()
    })

    function connectToNewUser(userId, myStream) {
      const call = myPeer.call(userId, myStream)
      const video = document.createElement('video')
      video.classList.add('video_box')
      console.log('유저연결 실행')  //8번
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
        console.log('비디오 함수 실행완')
      })
      call.on('close', () => {
        video.remove()
      })

      peers[userId] = call
    }
  }, [])

  function addVideoStream(video, stream) {
    console.log(stream) // 1번 // 12번
    video.srcObject = stream
    console.log(video)  // 2번 // 13번
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.current.append(video)  // 3번
    console.log('추가완') // 4번  // 14번
  }
  return (
    <>
      <div className="video_grid" ref={videoGrid}></div>
    </>
  )
}


export default VideoContainer
