import React from 'react'
import Peer from 'peerjs'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StartBtn from './buttons/StartBtn'
import cage from '../assets/icons/test.png'
//이름이 안떠,,,
const VideoContainer = () => {
  const socket = useSelector((state) => state.game.socket)
  const [cameraOn, setCameraOn] = React.useState(true)
  const [display, setDisplay] = React.useState(false)
  const videoWrap = React.useRef('')
  const videoGrid = React.useRef('')
  const videoBack = React.useRef('')
  // const myVideo = document.createElement('video')
  const myVideo = React.useRef()
  let allStream = React.useRef()
  myVideo.muted = true
  const peers = {}

  let peersNick
  let peerNick = ''
  let peerNickname = ''
  let myPeerId = ''
  let myStream = null
  let userNick = localStorage.getItem('userNick')
  let UserNick = localStorage.getItem('userNick')

  console.log(videoWrap.current)

  // const handleCamera = () => {
  //   setCameraOn((prev) => !prev)
  //   if (cameraOn) {
  //     let video = allStream.current.getTracks()
  //     video[0].enabled = false
  //     let src = document.querySelector('.video_non_src')
  //     src.style.display = 'block'
  //   } else {
  //     let video = allStream.current.getTracks()
  //     video[0].enabled = true
  //     let src = document.querySelector('.video_non_src')
  //     src.style.display = 'none'
  //   }
  // }

  //테스트

  React.useEffect(() => {
    const myPeer = new Peer()
    myPeer.nick = UserNick

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        myStream = stream
        let streamId = stream.id
        addVideoStream(myVideo.current, stream)
        myVideo.current.classList.add('video_box')
        videoGrid.current.prepend(myVideo.current)
        allStream.current = stream

        console.log(myPeer)

        if (myPeer._id == null) {
          myPeer.on('open', (peerId) => {
            console.log(peerId)
            myPeerId = peerId
            socket.emit('peerJoinRoom', myPeerId, userNick, streamId)
          })
        } else {
          socket.emit('peerJoinRoom', myPeer._id, userNick, streamId)
        }

        // myPeer?.on('connection', (dataConnection) => {
        //   peersNick = dataConnection.metadata
        //   let peerNick = document.createElement('p')
        //   peerNick.innerText = peersNick
        //   const nickBox = document.querySelector('.userview_name')
        //   nickBox.prepend(peerNick)
        //   console.log(nickBox)
        // })

        //새 피어가 연결을 원할 때
        myPeer.on('call', (call) => {
          console.log('콜 찍히니?')
          call.answer(stream)
          const videoBox = document.createElement('div')
          videoBox.classList.add('video_grid')
          const peerVideo = document.createElement('video')
          peerVideo.classList.add('video_box')
          const nickBox = document.createElement('div')
          nickBox.classList.add('userview_name', 'fl')

          nickBox.prepend(videoBox)
          videoBox.prepend(peerVideo)
          console.log(videoBox)
          videoWrap.current.prepend(videoBox)

          call.on('stream', (userVideoStream) => {
            addVideoStream(peerVideo, userVideoStream)
            videoBox.prepend(peerVideo)
            console.log('here')
          })
        })

        //두번째 순서 => peer.call
        socket.on('user-connected', (userId, userNick, streamId) => {
          console.log(userId, streamId, userNick)

          const call = myPeer.call(userId, myStream)
          myPeer.connect(userId, { metadata: UserNick })

          const videoBox = document.createElement('div')
          videoBox.classList.add('video_grid')
          const newVideo = document.createElement('video')
          newVideo.classList.add('video_box')
          const nickBox = document.createElement('div')
          nickBox.classList.add('userview_name')
          let peerNick = document.createElement('p')
          peerNick.innerText = userNick
          nickBox.prepend(peerNick)
          videoBox.prepend(newVideo)
          videoBox.prepend(nickBox)
          console.log(videoWrap.current)
          videoWrap.current.prepend(videoBox)
          console.log('연결함수 실행완')

          call.on('stream', (newStream) => {
            addVideoStream(newVideo, newStream)
            videoBox.prepend(newVideo)
            console.log('추가완료')
          })
        })
      })
      .catch((err) => {
        console.log('err', err)
      })

    socket.on('user-disconnected', (userId, userNick, streamId) => {
      const video = document.querySelectorAll('video')
      // const video_box = document.querySelectorAll('video_box')
      // const nick_box = document.querySelectorAll('userview_name')
      let removeVideo
      console.log('나감')

      for (let i = 0; i < video.length; i++) {
        if (video[i].srcObject.id === streamId) {
          removeVideo = video[i]
        }
      }
      removeVideo.parentNode.remove()
    })
    return function cleanup() {
      myStream.getTracks().forEach((track) => {
        track.stop()
      })
      myPeer.destroy()
    }
  }, [])

  return (
    <>
      <Container>
        <div className="video_container" ref={videoWrap}>
          <div className="video_grid" ref={videoGrid}>
            <video
              ref={myVideo}
              className="myvideo"
              onMouseOver={() => {
                videoBack.current.style.display = 'block'
                setDisplay(!display)
              }}
            ></video>
            <div
              className="video_background"
              ref={videoBack}
              onMouseOut={() => {
                videoBack.current.style.display = 'none'
                setDisplay(!display)
              }}
            ></div>
            {/* <button
                cameraOn={cameraOn}
                display={display}
                handleCamera={handleCamera}
              /> */}
            <div className="userview_name fl">
              <p>{userNick}</p>
            </div>
          </div>
        </div>
        <StartBtn socket={socket} />
      </Container>
    </>
  )
}

function addVideoStream(video, stream) {
  console.log(stream)
  video.srcObject = stream
  console.log(video)
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  return null
  // videoGrid.current.append(video)
  // console.log('추가완')
}

const Container = styled.div`
  width: 62%;
  padding: 15vh 0 0 15vh;
`

export default VideoContainer
