import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'
import ReadyTag from './ReadyTag'
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
  const currentTime = useSelector((state) => state.game.night)
  const endGameNoti = useSelector(state => state.game.endGameNoti)
  const currentId = localStorage.getItem('userId')
  const [getTime, setTime] = useState(false);

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

  const timeNoti = () => {
    setTime(true)
    setTimeout(() => {
      setTime(false)
    }, 5000)
  }
  // --------- 여기서부터 peer -------------

  // const myVideo = document.createElement('video')

  let myStream = null
  let myPeerId = ''
  const peers = {}
  const myVideo = useRef(null)
  const videoGrid = useRef(null)
  const videoContent = useRef('')
  const { roomId } = useParams()
  // console.log(roomId)
  const ReadyCheck = styled.div`
  width:30px;
  height:30px;
  
`

  useEffect(() => {
    if(!endGameNoti){
      if(currentTime){
        timeNoti()
      }
    }
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          myStream = stream
          // console.log(myVideo.current, stream)
          addVideoStream(myVideo.current, stream)
          videoGrid.current.prepend(myVideo.current)
          // console.log('마이 스트림 받았음', stream)

          // socket.on('user-connected', (userId) => {
          //   console.log(userId)
          //   const call = myPeer.call(userId, stream)
          //   console.log(call)
          //   console.log('새로운 유저와 연결중..', userId)
          //   const videoBox = document.createElement('div')
          //   const newVideo = document.createElement('video')
          //   videoBox.prepend(newVideo)
          //   // videoContent.current.prepend(videoBox)
          //   console.log('div생성완료', videoBox)

          //   call.on('stream', (newStream) => {
          //     console.log(newStream)
          //     addVideoStream(newVideo, newStream)
          //     videoBox.prepend(newVideo)
          //     console.log('div에 스트림저장', newStream)
          //   })
          // })

          // //피어에게 call 요청
          // myPeer.on('call', (call) => {
          //   console.log(call, '콜 거는 중...')
          //   call.answer(stream)
          //   console.log('콜 받았삼')
          //   const videoBox = document.createElement('div')
          //   videoBox.classList.add('video_box')
          //   const peerVideo = document.createElement('video')
          //   videoBox.prepend(peerVideo)
          //   // videoContent.current.prepend(videoBox)
          //   //
          //   call.on('stream', (newStream) => {
          //     console.log('상대방 스트림 요청중', newStream)
          //     addVideoStream(peerVideo, newStream)
          //     videoBox.prepend(peerVideo)
          //     console.log('상대방 스트림 추가 완료')
          // })
          // })
        })
        .catch((error) => {
          // console.log('통신err', error)
        })
    } catch {}
    socket.on('user-disconnected', (userId) => {
      // console.log('잘가요', userId)
      if (peers[userId]) peers[userId].close()
    })
  }, [])

  function addVideoStream(video, stream) {
    video.srcObject = stream
    // console.log('비디오 추가 준비', video)
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
          getTime == true
            ? <div
              style={{
                height: 150,
                width: 250,
                borderRadius: '5%',
                background: '#eee',
                paddingTop: 20,
                position:'absolute',
                right:-120,
                top:-110,
              }}
            ><Text bold size='26px'>{currentTime}이 되었습니다</Text></div>
          : null
        }
        open
      >
        
        {memberId.map((e, i) => {
          return (
            <Grid key={i} center>
              {/* <div id="video-grid" ref={videoContent}> */}
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
                <video
                  ref={myVideo}
                  style={{ objectFit: 'cover' }}
                  autoPlay
                ></video>
                <div>
                  <button
                    onClick={() => {
                      active(e, playerJob, is_night)
                    }}
                  >
                    선택하기
                  </button>
                  <ReadyTag e={e}/>
                  <NameTag>{e}</NameTag>
                </div>
              </div>
              {/* </div> */}
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

function addVideoStream(video, stream) {
  video.srcObject = stream
  console.log('비디오 추가 준비', video)
  video.addEventListener('loadedmetadata', () => {
    video.play() //이벤트리스너 추가되었는지 확인
  })
}

export default VideoContainer
