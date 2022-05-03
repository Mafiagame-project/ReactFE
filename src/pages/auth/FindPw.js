import React from 'react'
import { AuthInput, Grid, Button, Text } from '../../element/index'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import styled from 'styled-components'

const FindPw = () => {
  const dispatch = useDispatch()
  const [findPw, setFindPw] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)
  const [findSubmit, setFindSubmit] = React.useState(false)

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    setFindPw((values) => ({ ...values, [id]: value }))
  }

  const handleFindPw = () => {
    if (!findPw.email || !findPw.id) {
      setSubmitted(true)
      alert('빈칸을 채워주세요!')
      return
    }
    setFindSubmit(true)
    dispatch(userActions.findPwDB(findPw))
  }

  const handleChangePw = () => {
    dispatch(userActions.changePwDB(findPw))
  }

  return (
    <Container>
      <Grid flex_column>
        <Text>비밀번호 찾기</Text>
        <AuthInput
          id="id"
          value={findPw.id}
          _onChange={handleChange}
          placeholder="아이디"
        />
        <AuthInput
          id="email"
          value={findPw.email}
          _onChange={handleChange}
          placeholder="이메일"
        />
        <Button purpleBtn margin="20px" _onClick={handleFindPw}>
          비밀번호 찾기
        </Button>
      </Grid>
      {/* 인증 전송 후 보이는 페이지 따로 페이지를 뺄까 고민,, */}
      {findSubmit ? (
        <Grid flex_column>
          <AuthInput
            id="id"
            value={findPw.changeId}
            _onChange={handleChange}
            placeholder="아이디"
          />
          <AuthInput
            id="email"
            value={findPw.changeEmail}
            _onChange={handleChange}
            placeholder="이메일"
          />
          <AuthInput
            id="getpw"
            value={findPw.getPw}
            type="password"
            _onChange={handleChange}
            placeholder="인증 비밀번호"
          />
          <AuthInput
            id="newPw"
            type="password"
            value={findPw.newPw}
            _onChange={handleChange}
            placeholder="새 비밀번호"
          />
          <AuthInput
            id="newPwCheck"
            type="password"
            value={findPw.newPwCheck}
            _onChange={handleChange}
            placeholder="새 비밀번호 확인"
          />
          <Button purpleBtn margin="20px" _onClick={handleChangePw}>
            비밀번호 변경
          </Button>
        </Grid>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  margin: 100px auto;
`

export default FindPw
