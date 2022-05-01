import React from 'react'
import { history } from '../../redux/configureStore'
import { Input, Grid, Button, Text, Image } from '../../element/index'
import styled from 'styled-components'
import kakao from '../../assets/icons/kakao_login.png'
import { actionCreators as userActions } from '../../redux/modules/user'
import { useDispatch } from 'react-redux'

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
  //kakao 나중에 따로 파일 빼기
  const REST_API_KEY = '6c9c16d27b420108ed23421696dfba3b'
  const REDIRECT_URI = 'http://localhost:3000/main'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return (
    <>
      <Container>
        <Grid flex_column>
          <Text size="20px" bold>
            Login
          </Text>
          <Input
            id="id"
            label="ID"
            value={logins.id}
            _onChange={handleChange}
            placeholder="아이디를 입력해주세요"
          />
          <Input
            id="pw"
            label="Password"
            value={logins.pw}
            type="password"
            _onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <Button _onClick={handleLogin} margin="20px">
            로그인하기
          </Button>
          <Grid isFlex_center>
            <Text
              _onClick={() => {
                history.push('/signup')
              }}
            >
              회원가입
            </Text>
            <Text>&nbsp;/&nbsp;</Text>{' '}
            <Text
              _onClick={() => {
                history.push('/findpw')
              }}
            >
              비밀번호 찾기
            </Text>
          </Grid>
        </Grid>
        <hr />
        <Grid flex_column>
          <Text size="20px" bold>
            sns 로그인
          </Text>
          <Grid isFlex_center>
            <a href={KAKAO_AUTH_URL}>
              <img src={kakao} />
            </a>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 100px auto;
`

export default Login
