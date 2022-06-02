import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Grid, Text } from '../../element/index'
import { actionCreators as gameActions } from '../../redux/modules/game'
import data from '../../shared/introduce'

// 게임시작 직후 출력되는 직업모달
const JobModal = () => {
  const dispatch = useDispatch()
  const startCard = useSelector((state) => state.game.card)
  const player = useSelector((state) => state.game.jobNoti)
  const [getJob, setJob] = useState()
  const [getDesc, setDesc] = useState()
  const [getImg, setImg] = useState()
  const [getShadow, setShadow] = useState()
  const [getRule, setRule] = useState()

  useEffect(() => {
    if (startCard) { // startCard : 게임 시작했다는 신호 (boolean)
      data.forEach((element) => { // 각 직업들의 정보는 로컬파일에서 가져옴
        if (player === element.name) {
          setShadow(element.shadow)
          setJob(element.title)
          setDesc(element.explain)
          setImg(element.img)
          setRule(element.desc)
        }
      })
      setTimeout(() => { // 8초동안 보여주고 삭제시키기
        dispatch(gameActions.startCard(null))
      }, 8000)
    }
  }, [startCard])

  return (
    <>
      {startCard === true ? (
        <Modalblack>
          <Noti>
            <Text color="white" size="30px" margin="0 0 7vh 0">
              당신의 직업은...
            </Text>
            <Contents>
              <Header getShadow={getShadow}>
                <Text color="white" size="15px">
                  MAFIYANG
                </Text>
              </Header>
              <Grid height="15%" />
              <Grid height="50%">
                <img
                  style={{ width: '150px', height: '150px' }}
                  src={getImg}
                  alt="job"
                />
              </Grid>
              <Grid isFlex_center height="15%">
                <Grid width="200px" height="40px" bg="black">
                  <Text size="30px" color="white" margin="8px 0 15px 0">
                    {getJob}
                  </Text>
                </Grid>
              </Grid>
            </Contents>
            <Desc>{getRule}</Desc>
          </Noti>
        </Modalblack>
      ) : null}
    </>
  )
}
const Header = styled.div`
  width: 100%;
  height: 8%;
  margin-top: -25px;
  padding-top: 12px;
  border-radius: 40px 40px 0 0;
  background: black;
  box-shadow: ${(props) => props.getShadow};
`

const Contents = styled.div`
  background: white;
  width: 300px;
  height: 395px;
  box-sizing: border-box;
  border-radius: 40px 40px 0 0;
  margin: 0 auto;
`

const Desc = styled.div`
  padding: 1.2vw;
  background-color: #fff;
  border: 1px solid black;
  width: 400px;
  border-radius: 1vw;
  margin: 1vw auto 0;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
