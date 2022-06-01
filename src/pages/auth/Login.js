import React from 'react'
import { history } from '../../redux/configureStore'
import styled from 'styled-components'
import { Grid, Text, Input, DotButton } from '../../element/index'
import { actionCreators as userActions } from '../../redux/modules/user'
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '../../shared/Oauth'
import { useDispatch } from 'react-redux'
import kakao from '../../assets/icons/social/kakao_login_medium_wide.png'
import naver from '../../assets/icons/social/naverLogin.png'
import logo from '../../assets/logo/기본값.png'
import { clickSF, deniedSF } from '../../element/Sound'

function Login() {
  const dispatch = useDispatch()
  const [logins, setLogins] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    setLogins((values) => ({ ...values, [id]: value }))
  }

  const handleLogin = () => {
    if (!logins.id || !logins.pw) {
      deniedSF.play()
      setSubmitted(true)
      alert('빈칸을 채워주세요!')
      return
    }
    clickSF.play()
    dispatch(userActions.loginDB(logins))
  }

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
            {/* <a href={NAVER_AUTH_URL}>
              <img src={naver} alt="네이버" style={{ margin: '0 0.3vw' }} />
            </a> */}
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
