import React from 'react'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'
import Peer from 'peerjs'

const VideoContainer = (props) => {
  const socket = props.socket
  const memberId = useSelector((state) => state.member.memberId)
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

  // <--------- 여기서부터 peer ---------->

  // const videoGrid = document.querySelector('.video-grid')
  // const myVideo = document.createElement('video')
  let myStream = null
  let myPeerId = ''
  let allStream = React.useRef()
  const peers = {}
  const [cameraOn, setCameraOn] = React.useState(true)
  const [display, setDisplay] = React.useState(false)
  const videoContainer = React.useRef()
  const videoGrid = React.useRef()
  const myVideo = React.useRef()

  //카메라 onoff
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

  React.useEffect(() => {
    //유저의 브라우저로부터 미디어 가져오기
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        console.log(stream)
        myStream = stream
        let streamId = stream.id
        // midia Device를 받아오는데 성공하면 stream을 넘겨받을 수 있음
        //addVideoStream은 받아온 스트림을 나의 브라우저에 추가 시킴
        addVideoStream(myVideo.current, stream)
        videoGrid.current.prepend(myVideo.current)
        allStream.current = stream
        console.log('open전')
        // user-connected 이벤트가 발생하면 새롭게 접속한 유저에게 call 요청 보내기,
        // call 요청은 각각의 peer가 가지고 있는 userId를 통해 할 수 있는데  userId를 서버로부터 받아온 후 call 보내는 것
        // peer.on('open', (peerId) => {
        //   console.log(peerId)
        //   myPeerId = peerId
        //   socket.emit('PeerId', peerId)
        // })

        //여기서 멈춤???
        // 그 후 누군가 나에게 요청을 보내면 event on 해줌
        // call.answer는 나에게 응답을 준 다른 peer의 요청을 수락하는 코드?
        // 나의 stream => 다른 동료에게 보내준다. answer가 발생하면 'stream'이라는 이벤트를 통해서 다른 유저의 stream 받아오기
        // call.on('stream')에서는 다른 유저의 stream의 나의 브라우저에 추가시키는 콜백 함수 실행

        if (peer._id == null) {
          peer.on('open', (peerId) => {
            console.log(peerId)
            myPeerId = peerId
            socket.emit('join-room', peerId)
          })
        } else {
          socket.emit('join-room', peer._id)
        }

        console.log('call 전')
        peer.on('call', (call) => {
          console.log(call, '찍혀라찍혀라찍혀라')
          call.answer(stream)
          const video = document.createElement('video')

          call.on('stream', (userVideoStream) => {
            console.log(userVideoStream)
            addVideoStream(video, userVideoStream)
          })
        })
        socket.on('user-connected', (userId) => {
          connectToNewUser(userId, stream)
        })
      })

    socket.on('user-disconnected', (userId) => {
      console.log(userId)
      if (peers[userId]) peers[userId].close()
    })
    function connectToNewUser(userId, stream) {
      console.log(userId, stream)
      const call = peer.call(userId, stream)
      console.log(call)
      const video = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })

      peers[userId] = call
    }
  }, [])

  //둘다 못 받아옴

  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
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
        {memberId.map((e) => {
          return (
            <Grid center>
              <div
                ref={videoGrid}
                style={{
                  width: '150px',
                  height: '150px',
                  // backgroundImage:
                  //   'url(https://ssl.nexon.com/s2/game/kart/v2/event/2019/0110_clubtoon/cha1.png)',
                }}
              >
                {/* <video ref={myVideo} autoPlay></video> */}
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

import React from 'react'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'
import Peer from 'peerjs'

const VideoContainer = (props) => {
  const socket = props.socket
  const memberId = useSelector((state) => state.member.memberId)
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
  // 여기서부터 peer
  const videoGrid = document.querySelector('.video-grid')
  const myPeer = new Peer()
  const myVideo = document.createElement('video')
  const peers = {}

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream)
      myPeer.on('call', (call) => {
        console.log(call)
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', (userVideoStream) => {
          console.log(userVideoStream)
          addVideoStream(video, userVideoStream)
        })
      })
      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream)
      })
    })
  console.log('d')
  socket.on('user-disconnected', (userId) => {
    console.log(userId)
    if (peers[userId]) peers[userId].close()
  })

  // myPeer.on('open', (id) => {
  //   console.log(id)
  //   socket.emit('joinRoom', roomInfo?.roomId, id);
  // });

  function connectToNewUser(userId, stream) {
    console.log(userId, stream)
    const call = myPeer.call(userId, stream)
    console.log(call)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })

    peers[userId] = call
  }
  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
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
        {memberId.map((e) => {
          return (
            <Grid center>
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  backgroundImage:
                    'url(https://ssl.nexon.com/s2/game/kart/v2/event/2019/0110_clubtoon/cha1.png)',
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

const videoGrid = React.useRef()
// const myVideo = React.useRef()
const myVideo = document.createElement('video')
// myVideo.muted = true;
const peers = {}

React.useEffect(() => {
  //새로운 피어가 연결되면 호출
  socket.on('user-connected', (userId) => {
    connectToNewUser(userId, stream) //서버 코드 확인 해야함
  })
  //새로운 피어와 연결 성공하면 호출
  socket.on('connection', (data) => {
    console.log('호출 성공!')
  })
  myPeer.on('call', (call) => {
    console.log('call...중')
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        call.answer(stream)

        let video = document.createElement('video')
        videoFrid.append(video)

        call.on('stream', (remoteStream) => {
          addVideoStream(video, remoteStream)
        })
      })
      .catch((err) => {
        console.log(err, '에러에러')
      })
  })

  socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close()
  })

  function connectToNewUser(userId, stream) {
    console.log(userId, stream)
    const call = myPeer.call(userId, stream)
    console.log(call)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })

    peers[userId] = call
  }
  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.prepend(video)
  }
}, [])
