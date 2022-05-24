import React from 'react'
import { history } from '../../redux/configureStore'
import { Grid, Text, Image, Input, DotButton } from '../../element/index'
import { actionCreators as userActions } from '../../redux/modules/user'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import kakao from '../../assets/icons/social/kakaoLogin.png'
import naver from '../../assets/icons/social/naverLogin.png'
import pop from '../../assets/sound/effect/pop02.mp3'
import denied from '../../assets/sound/effect/denied02.mp3'
import logo from '../../assets/logo/기본값.png'

function Login() {
  const dispatch = useDispatch()
  const [logins, setLogins] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)
  const click = new Audio(pop)
  const alertBg = new Audio(denied)

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    setLogins((values) => ({ ...values, [id]: value }))
  }

  const handleLogin = () => {
    if (!logins.id || !logins.pw) {
      alertBg.play()
      setSubmitted(true)
      alert('빈칸을 채워주세요!')
      return
    }
    click.play()
    dispatch(userActions.loginDB(logins))
  }

  //kakao 나중에 따로 파일 빼기
  const REST_API_KEY = '6c9c16d27b420108ed23421696dfba3b'
  const REDIRECT_URI = 'https://www.mafiyang.com/main'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const NAVER_CLIENT_ID = '9WNFXnar7frmNNTQmP4N'
  const NAVER_CALLBACK_URI = 'https://mafiyang.com/main'

  const state = Math.random().toString(36).substring(2, 11)

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URI}&state=${state}`

  return (
    <div className="align_back">
      <Container>
        <Grid center>
          <img
            src={logo}
            alt="로고"
            style={{ width: '350px', margin: '1vw 0' }}
          />
        </Grid>
        <Grid flex_column>
          <Input
            auth
            id="id"
            value={logins.id}
            _onChange={handleChange}
            autocomplete="off"
            placeholder="아이디"
          />
          <Input
            auth
            id="pw"
            value={logins.pw}
            type="password"
            _onChange={handleChange}
            autocomplete="off"
            placeholder="비밀번호"
          />
          <Grid margin="20px 0 0">
            <DotButton black03 text="로그인" _onClick={handleLogin} />
          </Grid>
          <Grid isFlex_center margin="10px;">
            <Text
              color="#bbb"
              _onClick={() => {
                history.push('/signup')
              }}
            >
              회원가입
            </Text>
            <Text color="#bbb">&nbsp;/&nbsp;</Text>{' '}
            <Text
              color="#bbb"
              _onClick={() => {
                history.push('/findpw')
              }}
            >
              비밀번호 찾기
            </Text>
          </Grid>
        </Grid>

        <Grid flex_column>
          <Text margin="1.7vw 0 0" size="20px">
            sns 로그인
          </Text>
          <Grid isFlex_center margin="1vw 0">
            <a href={KAKAO_AUTH_URL}>
              <img src={kakao} alt="카카오" style={{ margin: '0 0.3vw' }} />
            </a>
            <a href={NAVER_AUTH_URL}>
              <img src={naver} alt="네이버" style={{ margin: '0 0.3vw' }} />
            </a>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 99;
  width: 100%;
  position: relative;
  overflow: scroll;
`

export default Login
