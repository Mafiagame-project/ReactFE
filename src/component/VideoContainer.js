import React from 'react'
import Peer from 'peerjs'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
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
    //   {
    //   config: { iceServers: [{ url: 'turn:numb.viagenie.ca' }] },
    // }
    myPeer.nick = userNick

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

        // myPeer.on('open', (id) => {
        //   console.log(id)
        //   socket.emit('peerJoinRoom', id, userNick, streamId)
        // })

        if (myPeer._id == null) {
          myPeer.on('open', (peerId) => {
            console.log(peerId)
            myPeerId = peerId
            socket.emit('peerJoinRoom', myPeerId, userNick, streamId)
          })
        } else {
          socket.emit('peerJoinRoom', myPeer._id, userNick, streamId)
        }

        myPeer.on('connection', (dataConnection) => {
          peersNick = dataConnection.metadata
          let peerNick = document.createElement('p')
          peerNick.innerText = peersNick
          const nickBox = document.querySelector('.userview_name')
          nickBox.prepend(peerNick)
          console.log(nickBox)
        })
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

          videoBox.prepend(peerVideo)
          videoBox.prepend(nickBox)
          console.log(videoBox)
          videoWrap.current.prepend(videoBox)

          call.on('stream', (userVideoStream) => {
            addVideoStream(peerVideo, userVideoStream)
            videoBox.prepend(peerVideo)
            console.log('here')
          })
          return null
        })

        //두번째 순서 => peer.call
        socket.on('user-connected', (userId, userNick, streamId) => {
          console.log(userId, streamId, userNick)

          const call = myPeer.call(userId, myStream)
          const dataConnection = myPeer.connect(userId, { metadata: userNick })

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
      const video_box = document.querySelectorAll('video_box')
      const nick_box = document.querySelectorAll('userview_name')
      let removeVideo

      for (let i = 0; i < video.length; i++) {
        if (video[i].srcObject.id === streamId) {
          removeVideo = video[i]
        }
      }
      removeVideo.parentNode.remove()
    })
    return
    // function cleanup() {
    //   myStream.getTracks().forEach((track) => {
    //     track.stop()
    //   })
    //   myPeer.destroy()
    // }
  }, [])

  return (
    <>
      <Container>
        <div className="real_container">
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
        </div>
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
  height: 600px;
`

export default VideoContainer
