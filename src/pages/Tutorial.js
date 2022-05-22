import Header from '../component/Header'
import { Grid, Text } from '../element/index'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import styled from 'styled-components'
import 튜토리얼1 from '../assets/image/tutorial/튜토리얼1.png'
import 튜토리얼2 from '../assets/image/tutorial/튜토리얼2.png'
import 튜토리얼3 from '../assets/image/tutorial/튜토리얼3.png'
import 튜토리얼4 from '../assets/image/tutorial/튜토리얼4.png'
import 돌아가기 from '../assets/icons/black/돌아가기.png'
import { history } from '../redux/configureStore'

function Tutorial() {
  return (
    <>
      <Grid flex_column width="100vw" height="69vh" margin="1vw 0 0 0">
        <Grid width="80%" height="100%">
          <Grid width="100%" height="100%">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Content>
                  <Grid isFlex_center height="100%" width="100%">
                    <ImgBox4>
                      <Explain>
                        <Text size="22px">
                          게임룸에 입장하게 되면 참가자들과 화상으로 혹은
                          채팅으로 대화하며 플레이할 수 있습니다!
                        </Text>
                      </Explain>
                    </ImgBox4>
                  </Grid>
                </Content>
              </SwiperSlide>
              <SwiperSlide>
                <Content>
                  <Grid isFlex_center height="100%" width="100%">
                    <ImgBox2>
                      <Explain>
                        <Text size="22px">
                          게임이 시작되면 직업이 부여됩니다.
                          <br />각 직업에 맞는 능력을 사용해 게임을 승리로
                          이끌어보세요!
                        </Text>
                      </Explain>
                    </ImgBox2>
                  </Grid>
                </Content>
              </SwiperSlide>
              <SwiperSlide>
                <Content>
                  <Grid isFlex_center height="100%" width="100%">
                    <ImgBox3>
                      <Explain>
                        <Text size="22px">
                          밤이 되면 각자 직업에 맞는 능력을 사용할 수 있습니다.{' '}
                          <br />
                          밤에는 마피아를 제외한 다른 직업은 채팅을 사용할 수
                          없습니다!
                        </Text>
                      </Explain>
                    </ImgBox3>
                  </Grid>
                </Content>
              </SwiperSlide>
              <SwiperSlide>
                <Content>
                  <Grid isFlex_center height="100%" width="100%">
                    <ImgBox1>
                      <Explain>
                        <Text size="22px">
                          시간이 낮으로 바뀌면 밤중에 각 참가자들이 진행했던
                          행동들이 사진과 같이 출력됩니다. <br />
                          중요한 정보들이 담겨 있으니 놓치지 마세요!
                        </Text>
                      </Explain>
                    </ImgBox1>
                  </Grid>
                </Content>
              </SwiperSlide>
            </Swiper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const Explain = styled.div`
  position: absolute;
  bottom: 50px;
  left: 10%;
  width: 80%;
  height: 60px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  border: 2px solid #000000;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`
const ImgBox1 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${튜토리얼1});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`
const ImgBox2 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${튜토리얼2});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`
const ImgBox3 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${튜토리얼3});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`
const ImgBox4 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${튜토리얼4});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`

export default Tutorial
