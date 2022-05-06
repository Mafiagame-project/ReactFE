import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'
import Peer from 'peerjs';
import '../shared/video.css';


const VideoContainer = (props) => {
  const socket = props.socket;
  const memberId = useSelector((state) => state.member.memberId)
  const myPeer = useSelector((state) => state.game.peerId)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const copSelect = useSelector(state => state.game.copSelect)
  const is_night = useSelector(state => state.game.night)
  const roomInfo = useSelector(state => state.room.current)
  const currentId = localStorage.getItem('userId')

  const active = (clickedId, clicker, time) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    let policeCnt = 0;
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
          if(clickerJob == 'police'){

          }
          socket.emit('vote', { clickerJob, clickerId, clickedId })
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
    }
    if(clickerJob == 'police' && time == true && policeCnt == 0){
      alert(`${clickedId}의 직업은 ${copSelect}입니다`)
      policeCnt++;
    }
  }
  // 여기서부터 peer
  const videoGrid = useRef();
  const myVideo = document.createElement('video');
  // const myVideo = useRef();
  const peers = {};
 
  useEffect(()=>{
    try{
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        }).then(stream => {
          let streamId = stream.id;
          addVideoStream(myVideo, stream);
    
          myPeer.on('call', (call) => {
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream', (userVideoStream) => {
              addVideoStream(video, userVideoStream);
            });
          });
          socket.on('user-connected', (userId) => {
            connectToNewUser(userId, stream);
          });
        }) 
        .catch(error => {
        })
      } catch (e){
        socket.on('user-connected', (userId) => {
          // connectToNewUser(userId, stream);
        });
        console.log(e)
      }
      socket.on('user-disconnected', (userId) => {
        if (peers[userId]) peers[userId].close();
      });
        
  
      function connectToNewUser(userId, stream) {
        console.log(userId, stream)
        const call = myPeer.call(userId, stream);
        console.log(call)
        const video = document.createElement('video');
        call.on('stream', (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
        call.on('close', () => {
          video.remove();
        });
      
        peers[userId] = call;
      }
      function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
        videoGrid.current.prepend(video);
      }
  },[])

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
              <div ref={videoGrid} style={{width:'200px', height:'200px', borderRadius:'50%', background:'#eee' }} className='video-grid'>
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
  margin:500px;
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
