import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Grid, Text } from '../../element/index'
import { actionCreators as gameActions } from '../../redux/modules/game'
import data from '../../shared/introduce';

const JobModal = () => {
  const dispatch = useDispatch();
  const copNoti = useSelector(state => state.game.copNoti);
  const startCard = useSelector(state => state.game.card)
  const copSelect = useSelector(state => state.game.copSelect)
  const player = useSelector(state => state.game.jobNoti)
  const [getJob, setJob] = useState();
  const [getDesc, setDesc] = useState();
  
  useEffect(()=>{

    if(startCard){
      data.forEach((element) => {
        if(player == element.name ){
          setJob(element.title)
          setDesc(element.explain)
        } 
      })
    }

    if(copNoti){
      data.forEach((element) => {
        if(copSelect == element.name ){
          setJob(element.title)
        } 
      })
    }
    
  },[getJob, copNoti, copSelect])

  console.log(copNoti, copSelect)
  return (
    <>
    {
      startCard == true
          ? <Noti>
              <Text bold size='20px'> 당신의 직업은...</Text>
              <Grid>
                <Text bold size='24px'>{getJob}</Text>
              </Grid>
              <Grid>
                <Text bold size='20px'>{getDesc}</Text>
              </Grid>
            </Noti>
          : <>
            {
              copNoti == true
              ? <Noti2>
                  <Text bold size='20px'>당신이 선택한 사람의 직업은</Text>
                  <Text bold size='32px'>{getJob}입니다</Text>
                </Noti2>
              : null
            }
            </>
    }
        
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

  const Noti2 = styled.div`
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
