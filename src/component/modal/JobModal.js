import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Grid, Text } from '../../element/index'
import { actionCreators as gameActions } from '../../redux/modules/game'
import data from '../../shared/introduce'
import 양 from '../../assets/image/character/양_시민.png'

const JobModal = () => {
  const dispatch = useDispatch()
  const startCard = useSelector((state) => state.game.card)
  const player = useSelector((state) => state.game.jobNoti)
  const [getJob, setJob] = useState()
  const [getDesc, setDesc] = useState()
  const [getImg, setImg] = useState()

  useEffect(() => {
    if (startCard) {
      data.forEach((element) => {
        if (player == element.name) {
          setJob(element.title)
          setDesc(element.explain)
          setImg(element.img)
        }
      })
      setTimeout(() => {
        dispatch(gameActions.startCard(null))
      }, 4000)
    }
  }, [startCard])

  return (
    <>
      {startCard == true ? (
        <Modalblack>
          <Noti>
            <Text color="white" size="30px" margin="0 0 7vh 0">
              당신의 직업은...
            </Text>
            <Contents>
              <div
                style={{
                  width: '100%',
                  height: '10%',
                  marginTop: '-25px',
                  paddingTop: '12px',
                  borderRadius: '40px 40px 0 0',
                  background: 'black',
                }}
              >
                <Text color="white" size="24px">
                  MAFIYANG
                </Text>
              </div>
              <Grid height="15%" />
              <Grid height="50%">
                <img style={{ width: '150px', height: '150px' }} src={getImg} />
              </Grid>
              <Grid isFlex_center height="15%">
                <Grid width="200px" height="40px" bg="black">
                  <Text size="30px" color="white" margin="8px 0 15px 0">
                    {getJob}
                  </Text>
                </Grid>
              </Grid>
            </Contents>
          </Noti>
        </Modalblack>
      ) : null}
    </>
  )
}

const Contents = styled.div`
  background: white;
  width: 330px;
  height: 435px;
  box-sizing: border-box;
  border-radius: 40px 40px 0 0;
  margin: 0 auto;
`

const Modalblack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 1s;
`

const Noti = styled.div`
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: relative;

  transition: 1s;
`

export default JobModal
