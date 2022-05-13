import React from 'react'
import { history } from '../../redux/configureStore'
import { Grid, Text, Image, Input, DotButton } from '../../element/index'
import { actionCreators as userActions } from '../../redux/modules/user'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import NaverLogin from '../../shared/NaverLogin'
import kakao from '../../assets/icons/social/kakao.png'

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
      setSubmitted(true)
      alert('빈칸을 채워주세요!')
      return
    }
    dispatch(userActions.loginDB(logins))
  }

  //  React.useEffect(() => {
  //      naverLogin();
  //      setError(false);
  //      setAlert(false);
  //  })

  //kakao 나중에 따로 파일 빼기
  const REST_API_KEY = '6c9c16d27b420108ed23421696dfba3b'
  const REDIRECT_URI = 'https://d191gfhy5yq8br.cloudfront.net/main'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return (
    <>
      <Container>
        <Grid center>
          <Text margin="0 0 20px" size="70px">
            MAFIYANG
          </Text>
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
          <Text size="20px">sns 로그인</Text>
          <Grid isFlex_center>
            <a href={KAKAO_AUTH_URL}>
              <Image size="80" margin="0 10px 0 0" src={kakao} />
            </a>
            <NaverLogin />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 150px auto;
`

export default Login
