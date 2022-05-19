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

  let peersNick
  let peerNick = ''
  let peerNickname = ''
  let myPeerId = ''
  let myStream = null
  let userNick = localStorage.getItem('userNick')
  let UserNick = localStorage.getItem('userNick')

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

        //내 스트림을 받고 실행합니다.
        if (myPeer?._id == null) {
          myPeer.on('open', (peerId) => {
            console.log({ peerId })
            myPeerId = peerId
            socket.emit('peerJoinRoom', myPeerId, userNick, streamId)
          })
        } else {
          console.log(myPeer._id)
          socket.emit('peerJoinRoom', myPeer._id, userNick, streamId)
        }

        //새로 들어온 피어는 기존의 피어에게 콜을 받습니다.
        myPeer?.on('call', (call) => {
          console.log('콜 찍히니?')
          call.answer(stream)
          const videoBox = document.createElement('div')
          videoBox.classList.add('video_grid')
          const peerVideo = document.createElement('video')
          peerVideo.classList.add('video_box')
          const newNickBox = document.createElement('div')
          newNickBox.classList.add('newuser_nick', 'fl')

          videoBox.prepend(peerVideo)
          videoBox.prepend(newNickBox)
          videoWrap.current.prepend(videoBox)

          call.on('stream', (userVideoStream) => {
            addVideoStream(peerVideo, userVideoStream)
            videoBox.prepend(peerVideo)
          })
        })

        //상대의 닉네임 받기
        myPeer?.on('connection', (dataConnection) => {
          peersNick = dataConnection.metadata
          console.log(peersNick)
          let peerNick = document.createElement('p')
          peerNick.innerText = peersNick
          const newNickBox = document.querySelector('.newuser_nick', 'fl')
          newNickBox.prepend(peerNick)
        })

        // 기존에 있던 피어는 새 피어가 room에 입장 시 커넥션을 받습니다.
        socket?.on('user-connected', (userId, userNick, streamId) => {
          console.log(userId, streamId, userNick)

          if (videoWrap.current) {
            const call = myPeer.call(userId, myStream)
            const dataConnection = myPeer.connect(userId, {
              metadata: UserNick,
            })

            const videoBox = document.createElement('div')
            videoBox.classList.add('video_grid')
            const newVideo = document.createElement('video')
            newVideo.classList.add('video_box')
            const nickBox = document.createElement('div')
            nickBox.classList.add('userview_name', 'fl')
            let peerNick = document.createElement('p')
            peerNick.innerText = userNick
            nickBox.prepend(peerNick)
            videoBox.prepend(newVideo)
            videoBox.prepend(nickBox)
            videoWrap.current.prepend(videoBox)

            call.on('stream', (newStream) => {
              addVideoStream(newVideo, newStream)
              videoBox.prepend(newVideo)
            })
          }
        })
      })
      .catch((err) => {
        console.log('err', err)
      })

    //피어가 방을 나갈 때
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
