import React from 'react'
import { useSelector } from 'react-redux'
import { Planet } from 'react-planet'
import { Grid, Text } from '../element/index'
import styled from 'styled-components'

const VideoContainer = (props) => {
  const socket = props.socket;
  const memberId = useSelector((state) => state.member.memberId)
  const playerJob = useSelector((state) => state.game.job)
  const killed = useSelector((state) => state.game.killed)
  const copSelect = useSelector(state => state.game.copSelect)
  const is_night = useSelector(state => state.game.night)
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
              <Inner>
                <button
                  onClick={() => {
                    active(e, playerJob, is_night)
                  }}
                >
                  선택하기
                </button>
              </Inner>
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
