import React from 'react'
import { Input, Grid, Button, Text } from '../element/index'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

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
    <>
      <Grid flex_column>
        <Input
          id="id"
          label="ID"
          value={findPw.id}
          _onChange={handleChange}
          placeholder="아이디를 입력해주세요"
        />
        <Input
          id="email"
          label="email"
          value={findPw.email}
          _onChange={handleChange}
          placeholder="이메일을 입력해주세요"
        />
        <Button margin="20px" _onClick={handleFindPw}>
          비밀번호 찾기
        </Button>
      </Grid>
      {/* 인증 전송 후 보이는 페이지 따로 페이지를 뺄까 고민,, */}
      {findSubmit ? (
        <Grid flex_column>
          <Input
            id="id"
            label="ID"
            value={findPw.changeId}
            _onChange={handleChange}
            placeholder="아이디를 입력해주세요"
          />
          <Input
            id="email"
            label="email"
            value={findPw.changeEmail}
            _onChange={handleChange}
            placeholder="아이디를 입력해주세요"
          />
          <Input
            id="getpw"
            label="password"
            value={findPw.getPw}
            type="password"
            _onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          <Input
            id="newPw"
            label="password"
            type="password"
            value={findPw.newPw}
            _onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          <Input
            id="newPwCheck"
            label="password"
            type="password"
            value={findPw.newPwCheck}
            _onChange={handleChange}
            placeholder="이메일을 입력해주세요"
          />
          <Button margin="20px" _onClick={handleChangePw}>
            비밀번호 찾기
          </Button>
        </Grid>
      ) : null}
    </>
  )
}

export default FindPw
