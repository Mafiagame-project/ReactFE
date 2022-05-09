import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Text } from '../../element/index'
import data from '../../shared/introduce';

const JobModal = (props) => {
  const player = props.players
  const [getJob, setJob] = useState();
  const [getDesc, setDesc] = useState();
  
  useEffect(()=>{
    data.forEach((element, idx) => {
      if(player == element.name ){
        setJob(element.title)
        setDesc(element.explain)
      } 
    })
  },[getJob])

  return (
    <>
        <Noti>
          <Text bold size='20px'> 당신의 직업은...</Text>
            <Grid>
              <Text bold size='24px'>{getJob}</Text>
            </Grid>
            <Grid>
              <Text bold size='20px'>{getDesc}</Text>
            </Grid>
        </Noti>
    </>
  )
}

const Noti = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 50%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
  `

export default JobModal
