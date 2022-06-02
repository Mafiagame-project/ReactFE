import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../../redux/modules/game'
import { Grid, Text } from '../../element/index'
import 늑대 from '../../assets/image/character/늑대_.png'
import 피해자 from '../../assets/image/character/양_시민.png'
import deadSheep from '../../assets/image/noti/기사_피해자양.gif'
import dayvote from '../../assets/image/character/양_behind.png'
import angel from '../../assets/image/noti/source/back-under.jpg'
import ballon from '../../assets/image/noti/source/말풍선(그림자).png'
import who from '../../assets/image/noti/의문늑대.png'
import 신문 from '../../assets/image/noti/기사_하단이미지(피그마판형).png'
import 모자이크 from '../../assets/image/noti/양_피그마판형.png'
import head from '../../assets/image/noti/속보.png'
import ad from '../../assets/image/noti/source/ad.jpg'
import point from '../../assets/image/noti/source/living_point.png'
import mafiaWin from '../../assets/image/noti/늑대_승리.gif'
import CitizenWin from '../../assets/image/noti/시민_승리.gif'
import happy from '../../assets/image/noti/기사_공백.gif'

// 밤이 끝나고 낮이 되면서 보여지는 신문기사 컴포넌트
function NotiModal() {
  const dispatch = useDispatch()
  const voteResult = useSelector((state) => state.game.resultNoti)
  const nightResult = useSelector((state) => state.game.resultNight)
  const endGameNoti = useSelector((state) => state.game.endGameNoti)
  const survivedNoti = useSelector((state) => state.game.survived)
  const currentTime = useSelector((state) => state.game.night)
  const reportNoti = useSelector((state) => state.game.repNoti)
  const dayCount = useSelector((state) => state.game.cnt)
  const votedJob = useSelector((state) => state.game.votedJob)
  const [getNotice, setNotice] = useState(false)

  // getNotice를 참 거짓으로 바꾸면서 보이고 안보이게 하는것을 작동함
  const printNoti = () => {
    setNotice(true)
    setTimeout(() => { // 6초동안 보여지고 false로 변경
      setNotice(false)
    }, 6000)
    dispatch(gameActions.noticeRep(null))
  }

  useEffect(() => { // 낮과 밤을 카운트해서 2번 이상 지나야 신문을 출력하도록 함
    if (dayCount < 2) {
      return
    } else {
      printNoti()
    }
  }, [dayCount])
  return (
    <>
      {getNotice ? ( // true or false로 보여지고 안보여지고를 출력
        <>
          {endGameNoti ? ( // 게임이 끝났는지 안끝났는지 분기
            <Modalblack>
              {currentTime ? (
                <VoteNoti>
                  <Text size="2vw">게임 결과</Text>
                  {endGameNoti === '마피아가 승리하였습니다.' ? (
                    <img src={mafiaWin} alt="win" style={{ width: '18vw' }} />
                  ) : (
                    <img src={CitizenWin} alt="win" style={{ width: '18vw' }} />
                  )}
                  <>
                    {votedJob === true ? (
                      <Text bold size="2vw">
                        마피아 {voteResult}가 잡혔습니다
                      </Text>
                    ) : (
                      <Text bold size="2vw">
                        시민 {voteResult}가 잡혔습니다
                      </Text>
                    )}
                  </>
                  <Text bold size="2vw">
                    {endGameNoti}
                  </Text>
                </VoteNoti>
              ) : ( 
                <VoteNoti>
                  <Text size="2vw">게임 결과</Text>
                  {endGameNoti === '마피아가 승리하였습니다.' ? (
                    <img src={mafiaWin} alt="win" style={{ width: '18vw' }} />
                  ) : (
                    <img src={CitizenWin} alt="win" style={{ width: '18vw' }} />
                  )}
                  <>
                    {nightResult ? (
                      <Text size="2vw">
                        마피아가 {nightResult}양을 잡아먹었습니다
                      </Text>
                    ) : null}
                  </>
                  <Text bold size="2vw">
                    {endGameNoti}
                  </Text>
                </VoteNoti>
              )}
            </Modalblack>
          ) : (
            <>
              {currentTime ? ( // 밤이면 낮의 결과가 출력
                <>
                  {voteResult !== false ? ( // 낮에 누가 죽었는지?
                    <Modalblack>
                      <VoteNoti>
                        <Text size="3vw">낮 투표결과 </Text>
                        <img
                          src={dayvote}
                          style={{
                            width: '8vw',
                            margin: '2vw 0',
                          }}
                          alt="vote"
                        />
                        <>
                          {votedJob === true ? (
                            <Text bold size="2vw">
                              마피아 {voteResult} 가 잡혔습니다
                            </Text>
                          ) : (
                            <Text bold size="2vw">
                              {voteResult}가 잡혔습니다
                            </Text>
                          )}
                        </>
                      </VoteNoti>
                    </Modalblack>
                  ) : (
                    <Modalblack>
                      <VoteNoti>
                        <Text size="2.5vw">낮 투표결과</Text>
                        <Text size="2vw" margin="4vw">
                          아무도 죽지 않았습니다
                        </Text>
                      </VoteNoti>
                    </Modalblack>
                  )}
                </>
              ) : ( // 밤에 출력되는 신문기사
                <Modalblack>
                  <Noti>
                    <Grid is_flex height="10%">
                      <Grid is_flex borderBottom margin="10px">
                        <Text size="1.8vw">MAFIYANG</Text>
                        <Text size="2.1vw">마피양 일보</Text>
                      </Grid>
                      <Grid is_flex borderBottom margin="10px">
                        <Text size="1.8vw">MAFIYANG</Text>
                        <Text size="1.8vw">2</Text>
                      </Grid>
                    </Grid>

                    <Grid is_flex height="100%">
                      <Grid width="50%" center height="100%">
                        <Grid height="50%">
                          {reportNoti ? ( // 리포터가 누군가를 골랐을 때 출력
                            <>
                              <Frame94>
                                <Grid
                                  is_flex
                                  position="absolute"
                                  top="30%"
                                  left="5%"
                                >
                                  <Frame45 />
                                  <Grid width="60%" isStart>
                                    <Text color="white" size="1.9vw">
                                      {reportNoti?.clickerNick}는..?!
                                    </Text>
                                    {reportNoti?.clickerJob === 'mafia' ? (
                                      <Text
                                        padding="0 3vw"
                                        margin="0.6vw"
                                        color="#61FF00"
                                        size="2.2vw"
                                      >
                                        마피아
                                      </Text>
                                    ) : reportNoti?.clickerJob === 'police' ? (
                                      <Text
                                        padding="0 3vw"
                                        margin="0.6vw"
                                        color="#61FF00"
                                        size="2.2vw"
                                      >
                                        경찰
                                      </Text>
                                    ) : reportNoti?.clickerJob === 'doctor' ? (
                                      <Text
                                        padding="0 3vw"
                                        margin="0.6vw"
                                        color="#61FF00"
                                        size="2.2vw"
                                      >
                                        의사
                                      </Text>
                                    ) : reportNoti?.clickerJob ===
                                      'reporter' ? (
                                      <Text
                                        padding="0 3vw"
                                        margin="0.6vw"
                                        color="#61FF00"
                                        size="2.2vw"
                                      >
                                        기자
                                      </Text>
                                    ) : reportNoti?.clickerJob === 'citizen' ? (
                                      <Text
                                        padding="0 3vw"
                                        margin="0.6vw"
                                        color="#61FF00"
                                        size="2.2vw"
                                      >
                                        시민
                                      </Text>
                                    ) : null}
                                    <Text color="white" size="1.5vw ">
                                      ...인것으로 밝혀져
                                    </Text>
                                    <Text
                                      color="#fff"
                                      size="1vw"
                                      margin="0.2vw 0 0"
                                    >
                                      누리꾼 경악... 일동 충격...
                                    </Text>
                                  </Grid>
                                </Grid>
                              </Frame94>
                            </>
                          ) : ( // 리포터가 안골랐을 때 디폴트 이미지
                            <>
                              <Grid isFlex_center height="100%" width="100%">
                                <Grid margin="0 1vw 0">
                                  <Text size="1.5vw" left>
                                    유명 배우 ○○○, <br />
                                    과거에 양아치였지만 지금은 아니야...
                                  </Text>
                                  <Grid borderLeft margin="4vh 0" width="90%">
                                    <Text size="0.8vw" margin="0 0 0 5px" left>
                                      ○○○은 지난 기자회견에서 과거에
                                      양아치였다는 의혹에 대해 인정하며 '비록
                                      비뚤어진 과거지만 지금은 양아치가 아닌
                                      양치기로서의 행보를 기대해 달라'라는
                                      입장을 표명했다.
                                    </Text>
                                  </Grid>{' '}
                                  <Text size="0.6vw" right margin="0 2vw 0 0">
                                    기자 맴매 ... meammea@mafiyang.com
                                  </Text>
                                </Grid>
                                <Grid
                                  width="100%"
                                  height="100%"
                                  isDisplay="grid"
                                  justify_item="end"
                                >
                                  <Frame72 />
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </Grid>
                        <Grid isFlex_center height="40%" width="95%">
                          <Grid width="21vw">
                            <Frame63 />
                            <Text size="0.4vw" margin="0.4vw 0 0" right>
                              풀을 뜯어먹는 평화로운 마피양 시민
                            </Text>
                          </Grid>
                          <Grid padding="5px" margin="0 0 0 1vw">
                            <Grid height="24%" borderBottom>
                              <img
                                src={point}
                                style={{ width: '6vw' }}
                                alt="리빙포인트"
                              />
                              <Text bold margin="0.5vw">
                                행복한 양의 비결은 풀 뜯어먹기!
                              </Text>
                            </Grid>
                            <Text size="0.8vw" margin="0.5vw 0 3.4vw 0" left>
                              오늘 하루도 풀 뜯어먹느라 고생한 당신만을 위해
                              최고의 풀뜯개를 소개합니다. 멋진 양이라면 집에
                              풀뜯개 쯤은 필수로 구비해둬야 한다는 사실을 알고
                              계시나요?
                              <br />
                              이것만 있으면 당신도 한 시대를 풍미하는 풀
                              뜯어먹는 양이 될 수 있다!
                            </Text>
                            <Grid height="7%" borderBottom>
                              <Text size="0.6vw" right margin="0 0 0.4vw">
                                기자 음매애... eemmae@mafiyang.com
                              </Text>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid width="50%" height="90%" flexColumn center>
                        <Grid height="50%">
                          {nightResult ? ( // 밤에 누군가가 마피아에의해 죽었을 때 출력하기
                            <>
                              <Grid
                                bg="#000"
                                margin="0 3vw"
                                padding="0.6vw"
                                width=""
                              >
                                <Text color="#fff" size="1.3vw">
                                  마피양 마을에 발견된 사체...
                                </Text>
                              </Grid>

                              <Grid>
                                <Text size="0.9vw" margin="2vw 0 0">
                                  <span
                                    style={{
                                      fontSize: '1.6vw',
                                      marginRight: '1vw',
                                    }}
                                  >
                                    "
                                  </span>
                                  과연 피해자
                                  <span style={{ color: '#950000' }}>
                                    {nightResult}
                                  </span>
                                  양을 잔혹하게
                                  <span
                                    style={{
                                      fontSize: '1.6vw',
                                      marginLeft: '1vw',
                                    }}
                                  >
                                    "
                                  </span>
                                  <br />
                                  죽인 마피아는 누구인가?
                                </Text>
                              </Grid>
                              <Grid isFlex_center>
                                <Grid width="40%">
                                  <img
                                    src={deadSheep}
                                    alt="dead"
                                    style={{
                                      width: '5vw',
                                      margin: '3vh 0 1vh',
                                    }}
                                  />
                                  <Text size="1.3vw" bold>
                                    피해자{' '}
                                    <span style={{ color: '#950000' }}>
                                      {nightResult}
                                    </span>
                                    양
                                  </Text>
                                </Grid>
                                <img
                                  src={who}
                                  alt="mafia"
                                  style={{ width: '6vw' }}
                                />
                              </Grid>
                            </>
                          ) : (
                            <img
                              src={happy}
                              alt="평화"
                              style={{ width: '25vw', margin: '0 0 0 4vw' }}
                            />
                          )}
                        </Grid>
                        {survivedNoti ? ( // 밤에 누군가가 의사에의해 살았을 때 출력
                          <>
                            <AngelNoti>
                              <Grid
                                bg="#fff"
                                margin="0 3vw"
                                padding="0.6vw"
                                width=""
                                position="absolute"
                                top="0.3vw"
                                right="14%"
                              >
                                <Text size="1.3vw">마피양 마을의 천사!</Text>
                              </Grid>
                              <img
                                src={ballon}
                                style={{
                                  width: '12vw',
                                  position: 'absolute',
                                  top: '35%',
                                  left: '10%',
                                }}
                                alt="말풍선"
                              />
                              <Grid
                                position="absolute"
                                top="5vw"
                                right="3vw"
                                width="9vw"
                              >
                                <img
                                  src={피해자}
                                  style={{
                                    width: '3vw',
                                  }}
                                  alt="피해자"
                                />
                                <Text bold>
                                  생존자
                                  <span style={{ color: '#61ff00' }}>
                                    {survivedNoti}
                                  </span>
                                  양
                                </Text>
                              </Grid>
                              <Frame02 />
                            </AngelNoti>
                          </>
                        ) : (
                          <Grid height="40%">
                            <img
                              src={ad}
                              style={{ width: '12vw', margin: '5vw 0 0 1.5vw' }}
                              alt="광고"
                            />{' '}
                          </Grid>
                        )}
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
const Frame02 = styled.div`
  background: url(${angel}), #c4c4c4;
  width: 29vw;
  height: 22vh;
  background-size: cover;
  border-radius: 2.1vw;
  border: 1px solid black;
`

const Frame72 = styled.div`
  box-sizing: border-box;
  width: 12vw;
  height: 28vh;
  margin-top: 1.7vw;
  background: url(${모자이크}), #c4c4c4;
  background-size: cover;
`

const Frame94 = styled.div`
  background: url(${head});
  width: 29vw;
  height: 32vh;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
`

const Frame63 = styled.div`
  box-sizing: border-box;
  height: 28vh;
  background: url(${신문}), #c4c4c4;
  background-size: cover;
`

const Frame45 = styled.div`
  box-sizing: border-box;
  width: 8vw;
  height: 8vw;
  background: url(${늑대}), #c4c4c4;
  background-size: cover;
  border: 0.3vw solid #ffffff;
  border-radius: 729.927px;
  margin: 0 1vw;
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
  background-color: rgba(0, 0, 0, 0.85);
`

const Noti = styled.div`
  background: white;
  max-width: 62vw;
  height: 82vh;
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
  // transition: all 2s;
  // animation: fadein 3s;
  // -webkit-animation: fadein 3s;
`

const VoteNoti = styled.div`
  background: white;
  max-width: 38vw;
  padding: 3vw;
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

const AngelNoti = styled.div`
  position: relative;
  padding: 0 0 1vw 2vw;
`

export default NotiModal
