import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Grid, Button, Text, Image } from '../../element/index'
import 늑대 from '../../assets/image/character/늑대_.png'
import 피해자 from '../../assets/image/character/양_시민.png'
import 신문 from '../../assets/image/noti/기사_하단이미지.png'
import 모자이크 from '../../assets/image/noti/양_피그마판형.png'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../../redux/modules/game'

function NotiModal() {
  const dispatch = useDispatch()
  const voteResult = useSelector((state) => state.game.resultNoti)
  const endGameNoti = useSelector((state) => state.game.endGameNoti)
  const survivedNoti = useSelector((state) => state.game.survived)
  const currentTime = useSelector((state) => state.game.night)
  const reportNoti = useSelector((state) => state.game.repNoti)
  const dayCount = useSelector((state) => state.game.cnt)
  const [getNotice, setNotice] = useState(false)

  const printNoti = () => {
    setNotice(true)
    setTimeout(() => {
      setNotice(false)
    }, 6000)
    dispatch(gameActions.noticeRep(null))
  }

  useEffect(() => {
    console.log(dayCount)
    if (dayCount < 2) {
      return
    } else {
      printNoti()
    }
  }, [dayCount])

  return (
    <>
      {getNotice === true ? (
        <>
          {endGameNoti ? ( // 게임이 끝났냐 안끝났냐
            <Modalblack>
              <VoteNoti>
                <Text size="40px">게임 결과</Text>
                <div
                  style={{
                    border: '1px solid black',
                    width: '150px',
                    height: '150px',
                    margin: '30px auto',
                  }}
                >
                  사진
                </div>
                <Text bold size="25px">
                  {endGameNoti}
                </Text>
              </VoteNoti>
            </Modalblack>
          ) : (
            <>
              {currentTime ? ( // 밤이면 낮의 결과가 출력
                <>
                  {voteResult ? ( // 아무도 안 죽음 (?)을 아무도 죽지않았습니다로 출력하게!
                    <Modalblack>
                      <VoteNoti>
                        <Text size="40px">낮 투표결과 </Text>
                        <div
                          style={{
                            border: '1px solid black',
                            width: '150px',
                            height: '150px',
                            margin: '30px auto',
                          }}
                        >
                          사진
                        </div>
                        {
                          voteResult == '아무도 안 죽음'
                          ? <Text bold size='32px'>아무도 죽지 않았습니다</Text>
                          : <Text bold size="32px">
                            {voteResult}가 잡혔습니다
                            </Text>
                        }
                        <Text bold size="32px">
                          {voteResult}가 잡혔습니다
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
                      <Grid center height="100%">
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
                                    <Text color="#61FF00" size="32px">
                                      마피아
                                    </Text>
                                  ) : reportNoti?.clickerJob === 'police' ? (
                                    <Text color="#61FF00" size="32px">
                                      경찰
                                    </Text>
                                  ) : reportNoti?.clickerJob === 'doctor' ? (
                                    <Text color="#61FF00" size="32px">
                                      의사
                                    </Text>
                                  ) : reportNoti?.clickerJob === 'reporter' ? (
                                    <Text color="#61FF00" size="32px">
                                      기자
                                    </Text>
                                  ) : reportNoti?.clickerJob === 'citizen' ? (
                                    <Text color="#61FF00" size="32px">
                                      시민
                                    </Text>
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
                                  <Grid borderLeft margin="4vh 0" width="90%">
                                    <Text margin="0 0 0 5px" left>
                                      ○○○은 지난 기자회견에서 과거에
                                      양아치였다는 의혹에 대해 인정하며 '비록
                                      비뚤어진 과거지만 지금은 양아치가 아닌
                                      양치기로서의 행보를 기대해 달라'라는
                                      입장을 표명했다.
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
                              오늘 하루도 풀 뜯어먹느라 고생한 당신만을 위해
                              최고의 풀뜯개를 소개합니다. 멋진 양이라면 집에
                              풀뜯개 쯤은 필수로 구비해둬야 한다는 사실을 알고
                              계시나요?
                              <br />
                              이것만 있으면 당신도 한 시대를 풍미하는 풀
                              뜯어먹는 양이 될 수 있다!
                            </Text>
                            <Grid height="7%" borderBottom>
                              <Text left>
                                기자 음매애... eemmae@mafiyang.com
                              </Text>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid height="90%" center>
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
                              <Text>과연 피해자 {voteResult} 잔혹하게</Text>
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
                                  <Text>의사선생님이 살려줬어요!</Text>
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
      ) : null}
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
`

const Noti = styled.div`
  background: white;
  max-width: 1330px;
  height: 865px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: relative;
  transition: all 2s;
  animation: fadein 3s;
  -webkit-animation: fadein 3s;
`

const VoteNoti = styled.div`
  background: white;
  max-width: 500px;
  height: 370px;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 20px;
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: relative;
`

export default NotiModal
