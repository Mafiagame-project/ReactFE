import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Grid, Text } from '../../element/index'
import { actionCreators as gameActions } from '../../redux/modules/game'
import data from '../../shared/introduce';
import 양 from '../../assets/image/character/양_시민.png'

const JobModal = () => {
  const dispatch = useDispatch();
  const startCard = useSelector(state => state.game.card)
  const player = useSelector(state => state.game.jobNoti)
  const [getJob, setJob] = useState();
  const [getDesc, setDesc] = useState();
  const [getImg, setImg] = useState();
  const [getTest, setTest] = useState(false)

  useEffect(()=>{
    if(getTest){
      data.forEach((element) => {
        if(player == element.name ){
          setJob(element.title)
          setDesc(element.explain)
          setImg(element.img)
        } 
      })
      setTimeout(()=>{
        dispatch(gameActions.startCard(null))
        setTest(!getTest)
      },4000)
    }
    
  },[getTest])

  return (
    <>
      {
        getTest == true
          ? <Modalblack>
            <Grid margin='150px 0 -50px 0' height='10%'>
              <Text color='white' size='40px'>당신의 직업은...</Text>
            </Grid>
            <Noti>
              <div style={{width:'100%', height:'10%', marginTop:'-25px', paddingTop:'12px', borderRadius:'40px 40px 0 0', background:'black'}}>
                <Text color='white' size='24px'>MAFIYANG</Text>
              </div>
              <Grid height='15%'/>
              <Grid height='40%'>
                <img style={{width:'150px', height:'150px'}} src={getImg}/>
              </Grid>
              <Grid isFlex_center height='15%'>
                <Grid width='200px' height='50px' bg='black'>
                  <Text size='30px' color='white' margin='8px 0 15px 0'>{getJob}</Text>
                </Grid>
              </Grid>
            </Noti>
          </Modalblack>
          : null
      }
    </>
  )
}
const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 5;
  transition: 1s;
`

const Noti = styled.div`
  display: inline-block;
  background:white;
  width: 550px;
  height: 725px;
  box-sizing: border-box;
  border-radius: 40px 40px 0 0;
  transition: 1s;
  `

export default JobModal
