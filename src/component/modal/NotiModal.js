import { useSelector } from "react-redux"
import styled from "styled-components"
import { Grid, Button, Text } from '../../element/index'
import 늑대 from '../../assets/image/character/늑대_.png'
import 피해자 from '../../assets/image/character/양_시민.png'
import { Rectangle } from "@mui/icons-material"

function NotiModal() {
    const voteResult = useSelector((state) => state.game.resultNoti)
    const endGameNoti = useSelector((state) => state.game.endGameNoti)
    const survivedNoti = useSelector((state) => state.game.survived)
    const currentTime = useSelector((state) => state.game.night)
    const reportNoti = useSelector(state => state.game.repNoti)

    // {
    //     reportNoti
    //     ?<>
    //         <Text>{reportNoti?.clickerId}의 정체는 사실</Text>
    //         <Text>{reportNoti?.clickerJob}!!</Text>
    //     </>
    //     : null
    // }

    return (
        <>
            {
                endGameNoti // 게임이 끝났냐 안끝났냐
                    ? <Noti>{endGameNoti}</Noti>
                    : <>
                        {
                            currentTime === '밤' // 밤이면 낮의 결과가 출력
                                ? <>
                                    {
                                        voteResult
                                            ? <Modalblack>
                                                <Noti>
                                                    <Text>투표 결과 </Text>
                                                    <Text>{voteResult}가 잡혔습니다 </Text>
                                                </Noti>
                                            </Modalblack>
                                            : <Modalblack>
                                                <Noti>
                                                    <Text>투표결과</Text>
                                                    <Text>아무도 죽지 않았습니다</Text>
                                                </Noti>
                                            </Modalblack>
                                    }
                                </>
                                : <Modalblack>
                                    <Noti>
                                        <Grid is_flex height='10%'>
                                            <Grid is_flex borderBottom margin='10px'>
                                                <Text size='30px'>MAFIYANG</Text>
                                                <Text size='30px'>마피양 일보</Text>
                                            </Grid>
                                            <Grid is_flex borderBottom margin='10px'>
                                                <Text size='30px'>MAFIYANG</Text>
                                                <Text size='30px'>2</Text>
                                            </Grid>
                                        </Grid>
                                        <Grid is_flex height='100%'>

                                            <Grid borderRight center height='100%'>
                                                <Grid height='50%'>
                                                    <BreakingHead>
                                                        <Text>속보!</Text>
                                                    </BreakingHead>
                                                    <Frame94>
                                                        <Frame45></Frame45>
                                                        <Grid>
                                                            <Text color='white' size='32px'>이범규</Text>
                                                            <Text color='#61FF00' size='32px'>마피아</Text>
                                                            <Text color='white' size='20px'>인것으로 밝혀져... 존나충격...</Text>
                                                        </Grid>
                                                    </Frame94>
                                                </Grid>
                                                <Grid isFlex_center height='40%' width='95%'>
                                                    <Grid height='100%'></Grid>
                                                    <Grid height='100%' padding='5px'>
                                                        <Grid height='20%' borderBottom>
                                                        <Text>리빙 포인트</Text>
                                                        <Text>행복한 양의 비결은 바로 풀 뜯어먹기!</Text>
                                                        </Grid>
                                                        <Text margin='30px 0 30px 0' left>오늘 하루도 풀 뜯어먹느라 고생한 당신만을 위해 최고의 풀뜯개를
                                                            소개합니다. 멋진 양이라면 집에 풀뜯개 쯤은 필수로 구비해둬야 한다는
                                                            사실을 알고 계시나요?<br/>
                                                            이것만 있으면 당신도 한 시대를 풍미하는 풀 뜯어먹는 양이 될 수 있다!
                                                        </Text>
                                                        <Grid height='7%' borderBottom>
                                                            <Text left>기자 음매애... eemmae@mafiyang.com</Text>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <Grid height='90%'>
                                                <Grid height='50%'>
                                                    <Text size='32px'>마피양 마을에 발견된 사체...</Text>
                                                    {
                                                        !voteResult
                                                        ?<><Grid isFlex_center>
                                                            <Victim></Victim>
                                                            <Text size='32px' bold>피해자 {voteResult}</Text>
                                                        </Grid>
                                                        <Text>과연 피해자 ...을 잔혹하게</Text>
                                                        <Text>죽인 마피아는 누구인가?</Text></>
                                                        : null
                                                    }
                                                </Grid>
                                                <Grid height='40%'>
                                                    <Text size='32px'>마피양 마을의 천사</Text>
                                                    {
                                                        !survivedNoti
                                                        ?<>
                                                        <Grid isFlex_center>
                                                            <Victim></Victim>
                                                            <Rectangle84>
                                                                <Text>의사선생님이 살려줬음!</Text>
                                                            </Rectangle84>
                                                        </Grid>
                                                        <Text size='32px' bold>생존자 {survivedNoti}</Text></>
                                                        : null
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Noti>
                                </Modalblack>
                        }
                    </>
            }
        </>
    )
}
const Frame94 = styled.div`
width: 80%;
height: 215px;
background: #000000;
border: 15px dashed #E30000;
padding:20px;
display:flex;
float:left;
`
const Victim = styled.div`
width:100px;
height:100px;
    background:url(${피해자});
    background-size:cover;
    margin:15px;
`
const Rectangle84 = styled.div`
box-sizing: border-box;
width: 217.5px;
height: 113px;
left: 285.5px;
top: 680px;

background: #F7F7F7;
border: 1px solid #000000;

`

const Frame45 = styled.div`
box-sizing: border-box;
width: 200px;
height: 200px;
background: url(${늑대}), #C4C4C4;
background-size: cover;
border: 5px solid #FFFFFF;
border-radius: 729.927px;
`

const BreakingHead = styled.div`
box-sizing: border-box;
margin-top : 30px;
width: 165px;
height: 70px;
background: #E30000;
border: 5px solid #000000;
font-style: normal;
font-weight: 400;
font-size: 35px;
line-height: 0px;
text-align: center;
color: #FFFFFF;
`

const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 5;
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
  `

export default NotiModal