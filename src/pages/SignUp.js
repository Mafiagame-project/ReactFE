import React from 'react'
import { history } from '../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Input, Grid, Button, Text, Image } from '../element/index'
import styled from 'styled-components'
import { actionCreators as userActions } from '../redux/modules/user'
import EmailCheck, { idVal, nickVal, pwVal } from '../shared/EmailCheck'

function SignUp() {
  const dispatch = useDispatch()
  const [signup, setSignup] = React.useState({})
  const [formCheck, setFormCheck] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    setSignup((values) => ({ ...values, [id]: value }))
  }
  //유효성 검사 넣어야함

  const handleSignup = () => {
    // if (!nickVal(signup.nick)) {
    //   alert('닉네임은 2~15자 한글,영문,숫자만 가능합니다')
    //   return
    // }
    // if (!pwVal(signup.pw)) {
    //   setFormCheck('패스워드 4~15자 영문+숫자만 가능합니다')
    //   return
    // }

    if (
      !signup.id ||
      !signup.email ||
      !signup.nick ||
      !signup.pw ||
      !signup.pwCheck
    ) {
      setSubmitted(true)
      alert('빈칸을 채워주세요!')
      return
    }
    dispatch(userActions.signupDB(signup))
  }

  return (
    <>
      <Container>
        <Grid flex_column>
          <Text size="20px" bold>
            Sign up
          </Text>
          <Input
            id="id"
            label="ID"
            value={signup.id}
            _onChange={handleChange}
            placeholder="아이디를 입력해주세요"
          />
          <Input
            id="email"
            label="Email"
            value={signup.email}
            _onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          <Input
            id="nick"
            label="Nickname"
            value={signup.nick}
            _onChange={handleChange}
            placeholder="닉네임은 2~15자 한글,영문,숫자만 가능합니다"
          />

          <Input
            id="pw"
            label="Password"
            value={signup.pw}
            type="password"
            _onChange={handleChange}
            placeholder="패스워드 4~15자 영문+숫자만 가능합니다"
          />
          <Input
            id="pwCheck"
            label="Password"
            value={signup.pwCheck}
            type="password"
            _onChange={handleChange}
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
