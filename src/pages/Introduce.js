import React from 'react'
import { actionCreators as userActions } from '../redux/modules/user'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import styled from 'styled-components'
import Header from '../component/Header'
import { Grid, Text } from '../element/index'
import data from '../shared/introduce'
import Tutorial from './Tutorial'
import 돌아가기 from '../assets/icons/black/돌아가기.png'
import title from '../assets/button/튜토리얼_타이틀선택배경.png'
import { clickSF } from '../element/Sound'

// 튜토리얼 페이지 중 직업튜토리얼 컴포넌트
function Introduce() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false)
  const [getPage, setPage] = React.useState(2)
  const [getShow, setShow] = React.useState(false)
  const [desc, setDesc] = React.useState()
  const [win, setWin] = React.useState()
  const [lose, setLose] = React.useState()
  const [ability, setAbility] = React.useState()

  window.onbeforeunload = function () {
    return dispatch(userActions.logOutDB())
  }
  const toggleBtn = () => {
    setIsOpen(!isOpen)
  }

  // 각 직업카드를 선택했을 때 바뀌는 하단의 설명들 변경
  const seleted = (element) => {
    clickSF.play()
    setDesc(element?.explain)
    setAbility(element?.ability)
    setWin(element?.win)
    setLose(element?.lose)
    element.info = true
    setShow(true)
  }

  const box2 = {
    opacity: `${getPage === 2 ? 1 : 0.4}`,
  }
  const box1 = {
    opacity: `${getPage === 1 ? 1 : 0.4}`,
  }

  return (
    <>
      <Header />
      <img
        onClick={() => {
          history.replace('/gamemain')
          clickSF.play()
        }}
        alt="돌아가기"
        style={{ position: 'absolute', margin: '4vw' }}
        src={돌아가기}
      />

      <Grid center flexColumn padding="2.5vw" margin="1vw 0">
        <Grid isFlex_center height="60px" width="40%">
          <TutorialBox
            style={box2}
            onClick={() => {
              setPage(2)
              clickSF.play()
            }}
          >
            <img src={title} alt="타이틀" />
            <TitleText>역할 튜토리얼</TitleText>
          </TutorialBox>
          <TutorialBox
            style={box1}
            onClick={() => {
              setPage(1)
              setShow(false)
              clickSF.play()
            }}
          >
            <img src={title} alt="타이틀" />
            <TitleText>게임 튜토리얼</TitleText>
          </TutorialBox>
        </Grid>

        {getPage === 1 ? (
          <Tutorial />
        ) : getPage === 2 ? (
          <CardBox>
            {data.map((e, idx) => {
              if (e.info === true) {
                e.info = false
                return (
                  <>
                    <Card
                      key={idx + 1}
                      onClick={() => {
                        seleted(e)
                      }}
                    >
                      <Grid isFlex_center height="10%">
                        <Text size="18px" color="white">
                          MAFIYANG
                        </Text>
                      </Grid>
                      <Grid
                        flexColumn_end
                        padding="20px 60px 20px 60px"
                        center
                        bg="white"
                        height="100%"
                        _onlick={toggleBtn}
                      >
                        <Img src={e.gif} />
                        <Grid
                          isFlex_center
                          height="12%"
                          bg="black"
                          margin="2vw 0 1.3vw"
                        >
                          <Text size="24px" color="white">
                            {e.title}
                          </Text>
                        </Grid>
                      </Grid>
                    </Card>
                  </>
                )
              } else {
                return (
                  <>
                    <NonCard
                      key={idx + 1}
                      onClick={() => {
                        seleted(e, idx)
                      }}
                    >
                      <Grid isFlex_center height="10%">
                        <Text size="18px" color="white">
                          MAFIYANG
                        </Text>
                      </Grid>
                      <Grid
                        flexColumn_end
                        padding="20px 60px 20px 60px"
                        center
                        height="100%"
                        bg="#fff"
                        _onlick={toggleBtn}
                      >
                        <Img src={e.img} />
                        <Grid
                          isFlex_center
                          height="12%"
                          bg="black"
                          margin="2vw 0 1.3vw"
                        >
                          <Text size="24px" color="white">
                            {e.title}
                          </Text>
                        </Grid>
                      </Grid>
                    </NonCard>
                  </>
                )
              }
            })}
          </CardBox>
        ) : null}
        <>
          {getShow === false ? null : (
            <Grid isFlex_center margin="30px 0 0 0">
              <Explain>
                <Text left size="21px" margin="0.3vw 0">
                  <span style={{ fontWeight: 'bold' }}>능력</span> : {ability}
                </Text>

                <Text left size="21px" margin="0.3vw 0">
                  <span style={{ fontWeight: 'bold' }}>승리조건</span> : {win}
                </Text>

                <Text left size="21px" margin="0.3vw 0">
                  <span style={{ fontWeight: 'bold' }}>패배조건</span> : {lose}
                </Text>
              </Explain>
            </Grid>
          )}
        </>
      </Grid>
    </>
  )
}

const Img = styled.img`
  width: 150px;
`
const CardBox = styled.div`
  width: 80%;
  margin: 3vw auto 1vw;
  overflow-x: scroll;
  display: flex;
  flex-direction: columns;
`

const Card = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 300px;
  min-width: 300px;
  height: 386px;
  background-color: black;
  border: 3px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover {
    border: 5px solid black;
  }
  &:click {
    border: 5px solid orange;
  }
`

const NonCard = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  opacity: 0.4;
  width: 300px;
  min-width: 300px;
  height: 386px;
  background-color: black;
  border: 3px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover {
    border: 5px solid black;
  }
  &:click {
    border: 5px solid orange;
  }
`

const Explain = styled.div`
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 15px;
  padding: 1.5vw;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`
const TutorialBox = styled.div`
  cursor: pointer;
  position: relative;
  text-align: center;
  margin: 10px;
`

const TitleText = styled.div`
  color: #000;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  font-size: 29px;
  transform: translate(-50%, -50%);
`

export default Introduce
