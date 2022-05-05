import React from 'react'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../../element/index'
import styled from 'styled-components'
import PeerVideo from './PeerVideo'

const VideoContainer = ({ socket }) => {
  const memberId = useSelector((state) => state.member.memberId)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const currentId = localStorage.getItem('userId')

  const active = (clickedId, clicker) => {
    let clickerJob = clicker.playerJob
    let clickerId = clicker.player
    if (currentId == clickedId) {
      alert('다른사람을 뽑아주세요')
      return
    }
    if (killed?.length > 0) {
      console.log(killed)
      killed.forEach((id) => {
        if (clicker.player == id) {
          alert('죽었습니다')
          return
        } else {
          socket.emit('vote', { clickerJob, clickerId, clickedId })
        }
      })
    } else {
      socket.emit('vote', { clickerJob, clickerId, clickedId })
    }
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
        orbitRadius={250}
        centerContent={<div />}
        open
      >
        {memberId.map((e) => {
          return (
            <Grid center>
              <PeerVideo socket={socket} style={Inner}>
                <button
                  onClick={() => {
                    active(e, playerJob)
                  }}
                >
                  선택하기
                </button>
              </PeerVideo>
              <NameTag>{e}</NameTag>
            </Grid>
          )
        })}
      </Planet>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  postion: absolute;
  background-color: blue;
  width: 400px;
  height: 500px;
  margin: 300px;
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
