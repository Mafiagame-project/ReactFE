import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Grid, Button, Text } from '../../element/index'
import 늑대 from '../../assets/image/character/늑대_.png'
import 피해자 from '../../assets/image/character/양_시민.png'
import 신문 from '../../assets/image/noti/기사_하단이미지.png'
import 모자이크 from '../../assets/image/noti/양_피그마판형.png'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../../redux/modules/game'

function NotiModal() {
  const dispatch = useDispatch();
  const voteResult = useSelector((state) => state.game.resultNoti)
  const endGameNoti = useSelector((state) => state.game.endGameNoti)
  const survivedNoti = useSelector((state) => state.game.survived)
  const currentTime = useSelector((state) => state.game.night)
  const reportNoti = useSelector((state) => state.game.repNoti)
  const dayCount = useSelector(state => state.game.cnt)
  const [getNotice, setNotice] = useState(false);

  const printNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 6000)
    dispatch(gameActions.noticeRep(null))
  }

  useEffect(()=>{
    if(dayCount < 2){
      return
    } else {
      printNoti();
    }
  },[dayCount])

  return (
    <>
    {
      getNotice === true 
      ?<>
        {endGameNoti ? ( // 게임이 끝났냐 안끝났냐
        <Modalblack>
          <VoteNoti>
            <Text bold size='32px'>{endGameNoti}</Text>
          </VoteNoti>
        </Modalblack>
      ) : (
        <>
          {currentTime ? ( // 밤이면 낮의 결과가 출력 
            <>
              {voteResult ? ( // 아무도 안 죽음 (?)을 아무도 죽지않았습니다로 출력하게!
                <Modalblack>
                  <VoteNoti>
                    <Text size="32px">낮 투표결과 </Text>
                    <Text bold size="32px">
                      {voteResult}가 잡혔습니다{' '}
                    </Text>
                  </VoteNoti>
                </Modalblack>
              ) : (
                <Modalblack>
                  <VoteNoti>
                    <Text size="32px">낮 투표결과</Text>
                    <Text bold size="32px">
                      아무도 죽지 않았습니다
                    </Text>
                  </VoteNoti>
                </Modalblack>
              )}
            </>
          ) : (
            <Modalblack>
              <Noti>
                <Grid is_flex height="10%">
                  <Grid is_flex borderBottom margin="10px">
                    <Text size="30px">MAFIYANG</Text>
                    <Text size="30px">마피양 일보</Text>
                  </Grid>
                  <Grid is_flex borderBottom margin="10px">
                    <Text size="30px">MAFIYANG</Text>
                    <Text size="30px">2</Text>
                  </Grid>
                </Grid>
                <Grid is_flex height="100%">
                  <Grid borderRight center height="100%">
                    <Grid height="50%">
                      {reportNoti ? (
                        <>
                          <BreakingHead>
                            <Text>속보!</Text>
                          </BreakingHead>
                          <Frame94>
                            <Frame45></Frame45>
                            <Grid>
                              <Text color="white" size="32px">
                                {reportNoti?.clickerId}
                              </Text>
                                  {reportNoti?.clickerJob === 'mafia' ? (
                                    <Text color="#61FF00" size="32px">마피아</Text>
                                  ) : reportNoti?.clickerJob === 'police' ? (
                                    <Text color="#61FF00" size="32px">경찰</Text>
                                  ) : reportNoti?.clickerJob === 'doctor' ? (
                                    <Text color="#61FF00" size="32px">의사</Text>
                                  ) : reportNoti?.clickerJob === 'reporter' ? (
                                    <Text color="#61FF00" size="32px">기자</Text>
                                  ) : reportNoti?.clickerJob === 'citizen' ? (
                                    <Text color="#61FF00" size="32px">시민</Text>
                                  ) : null}
                              <Text color="white" size="20px">
                                인것으로 밝혀져... 충격...
                              </Text>
                            </Grid>
                          </Frame94>
                        </>
                      ) : (
                        <>
                          <Grid isFlex_center height="100%" width="100%">
                            <Grid>
                              <Text size="30px" left>
                                유명 배우 ○○○ 과거에 양아치였지만 지금은
                                아니야...
                              </Text>
                              <Grid borderLeft>
                                <Text margin="0 0 0 5px" left>
                                  ○○○는 풀 한포기도 뜯어먹지 않는 양아치였다.
                                  과거를 반성하고 풀을 뜯어먹는데에
                                  이바지하겠다는 의사를 밝혔다. 구구절절 아무
                                  문장 ○○○는 풀 한포기도 뜯어먹지 않는
                                  양아치였다. 과거를 반성하고 풀을 뜯어먹는데에
                                  이바지하겠다는 의사를 밝혔다.구구절절 아무
                                  문장 ○○○는 풀 한포기도 뜯어먹지 않는
                                  양아치였다. 과거를 반성하고 풀을 뜯어먹는데에
                                  이바지하겠다는 의사를 밝혔다.
                                </Text>
                              </Grid>
                            </Grid>
                            <Grid width="100%" height="100%">
                              <Frame72 />
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Grid isFlex_center height="40%" width="95%">
                      <Grid height="100%">
                        <Frame63 />
                      </Grid>
                      <Grid height="100%" padding="5px">
                        <Grid height="20%" borderBottom>
                          <Text>리빙 포인트</Text>
                          <Text>행복한 양의 비결은 바로 풀 뜯어먹기!</Text>
                        </Grid>
                        <Text margin="30px 0 30px 0" left>
                          오늘 하루도 풀 뜯어먹느라 고생한 당신만을 위해 최고의
                          풀뜯개를 소개합니다. 멋진 양이라면 집에 풀뜯개 쯤은
                          필수로 구비해둬야 한다는 사실을 알고 계시나요?
                          <br />
                          이것만 있으면 당신도 한 시대를 풍미하는 풀 뜯어먹는
                          양이 될 수 있다!
                        </Text>
                        <Grid height="7%" borderBottom>
                          <Text left>기자 음매애... eemmae@mafiyang.com</Text>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid height="90%">
                    <Grid height="50%">
                      <Text size="32px">마피양 마을에 발견된 사체...</Text>
                      {voteResult ? (
                        <>
                          <Grid isFlex_center>
                            <Victim></Victim>
                            <Text size="32px" bold>
                              피해자 {voteResult}
                            </Text>
                          </Grid>
                          <Text>과연 피해자 ...을 잔혹하게</Text>
                          <Text>죽인 마피아는 누구인가?</Text>
                        </>
                      ) : null}
                    </Grid>
                    <Grid height="40%">
                      <Text size="32px">마피양 마을의 천사</Text>
                      {survivedNoti ? (
                        <>
                          <Grid isFlex_center>
                            <Victim></Victim>
                            <Rectangle84>
                              <Text>의사선생님이 살려줬음!</Text>
                            </Rectangle84>
                          </Grid>
                          <Text size="32px" bold>
                            생존자 {survivedNoti}
                          </Text>
                        </>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Noti>
            </Modalblack>
          )}
        </>
      )}
      </>
      : null
    }
      
    </>
  )
}
const Frame72 = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: 80%;
  margin-top: 50px;
  background: url(${모자이크}), #c4c4c4;
  background-size: cover;
`

const Frame94 = styled.div`
  width: 80%;
  height: 215px;
  background: #000000;
  border: 15px dashed #e30000;
  padding: 20px;
  display: flex;
  float: left;
`
const Victim = styled.div`
  width: 100px;
  height: 100px;
  background: url(${피해자});
  background-size: cover;
  margin: 15px;
`
const Rectangle84 = styled.div`
  box-sizing: border-box;
  width: 217.5px;
  height: 113px;
  left: 285.5px;
  top: 680px;
  background: #f7f7f7;
  border: 1px solid #000000;
`
const Frame63 = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  background: url(${신문}), #c4c4c4;
  background-size: cover;
`

const Frame45 = styled.div`
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  background: url(${늑대}), #c4c4c4;
  background-size: cover;
  border: 5px solid #ffffff;
  border-radius: 729.927px;
`

const BreakingHead = styled.div`
  box-sizing: border-box;
  margin-top: 30px;
  width: 165px;
  height: 70px;
  background: #e30000;
  border: 5px solid #000000;
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 0px;
  text-align: center;
  color: #ffffff;
`

const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 100;
`

const Noti = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 1330px;
  height: 865px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
  transition: all 2s;
  animation: fadein 3s;
  -webkit-animation: fadein 3s;
`

const VoteNoti = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 30%;
  height: 300px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
`

export default NotiModal
