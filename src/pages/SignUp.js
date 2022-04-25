import React from 'react'
import { history } from '../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Input, Grid, Button, Text, Image } from '../element/index'
import styled from 'styled-components'
import { actionCreators as userActions } from '../redux/modules/user'

function SignUp() {
  const dispatch = useDispatch()
  const [signup, setSignup] = React.useState({})

  //   const [submitted, setSubmitted] = React.useState(false)
  //   const handleChange = (e) => {
  //     const id = e.target.id
  //     const value = e.target.value
  //     console.log(value)
  //     setSignup((values) => ({ ...values, [id]: value }))
  //   }
  //유효성 검사 넣어야함

  const [id, setId] = React.useState('')
  const [pw, setPw] = React.useState('')
  const [pwCheck, setPwCheck] = React.useState('')
  const [nick, setNick] = React.useState('')

  const handleChangeId = (e) => {
    setId(e.target.value)
  }
  const handleChangeNick = (e) => {
    setNick(e.target.value)
  }

  const handleChangePw = (e) => {
    setPw(e.target.value)
  }

  const handleChangePwCheck = (e) => {
    setPwCheck(e.target.value)
  }

  const handleSignup = () => {
    if (!id || !nick || !pw || !pwCheck) {
      alert('빈칸을 채워주세요!')
      return
    }
    dispatch(userActions.signupDB(id, nick, pw, pwCheck))
  }

  return (
    <>
      <Container>
        <Grid flex_column>
          <Text size="20px" bold>
            Sign up
          </Text>
          <Input
            label="ID"
            value={id}
            _onChange={handleChangeId}
            placeholder="아이디를 입력해주세요"
          />
          <Input
            label="Nickname"
            value={nick}
            _onChange={handleChangeNick}
            placeholder="닉네임을 입력해주세요"
          />
          <Input
            label="Password"
            value={pw}
            type="password"
            _onChange={handleChangePw}
            placeholder="비밀번호를 입력해주세요"
          />
          <Input
            label="Password"
            value={pwCheck}
            type="password"
            _onChange={handleChangePwCheck}
            placeholder="비밀번호를 다시 입력해주세요"
          />
          <Button margin="20px" _onClick={handleSignup}>
            회원가입 하기
          </Button>
          <Grid isFlex_center>
            <Text
              _onClick={() => {
                history.push('/login')
              }}
            >
              뒤로가기
            </Text>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 100px auto;
`
export default SignUp
