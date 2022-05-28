import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import { Input, Grid, DotButton, Text } from '../../element/index'
import { clickSF, deniedSF } from '../../element/Sound'

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
      deniedSF.play()
      alert('빈칸을 채워주세요!')
      return
    }
    clickSF.play()
    setFindSubmit(true)
    dispatch(userActions.findPwDB(findPw))
  }

  const handleChangePw = () => {
    if (
      !findPw.changeId ||
      !findPw.changeEmail ||
      !findPw.getPw ||
      !findPw.newPw ||
      !findPw.newPwCheck
    ) {
      deniedSF.play()
      alert('빈칸을 채워주세요!')
      return
    }
    clickSF.play()
    dispatch(userActions.changePwDB(findPw))
  }

  return (
    <div className="align_back">
      <Container>
        <Text size="25px" margin="13px 7px">
          비밀번호 찾기
        </Text>
        <Grid flex_column>
          <Input
            auth
            id="id"
            value={findPw.id}
            _onChange={handleChange}
            placeholder="아이디"
          />
          <Input
            auth
            id="email"
            value={findPw.email}
            _onChange={handleChange}
            placeholder="이메일"
          />
          <Grid margin="15px 0">
            <DotButton black03 text="비밀번호 찾기" _onClick={handleFindPw} />
          </Grid>
        </Grid>
        {/* 인증 전송 후 보이는 페이지 따로 페이지를 뺄까 고민,, */}
        {findSubmit ? (
          <Grid flex_column>
            <Input
              auth
              id="id"
              value={findPw.changeId}
              _onChange={handleChange}
              placeholder="아이디"
            />
            <Input
              auth
              id="email"
              value={findPw.changeEmail}
              _onChange={handleChange}
              placeholder="이메일"
            />
            <Input
              auth
              id="getpw"
              value={findPw.getPw}
              type="password"
              _onChange={handleChange}
              placeholder="인증 비밀번호"
            />
            <Input
              auth
              id="newPw"
              type="password"
              value={findPw.newPw}
              _onChange={handleChange}
              placeholder="새 비밀번호"
            />
            <Input
              auth
              id="newPwCheck"
              type="password"
              value={findPw.newPwCheck}
              _onChange={handleChange}
              placeholder="새 비밀번호 확인"
            />
            <Grid margin="15px 0">
              <DotButton black03 text="변경 확인" _onClick={handleChangePw} />
            </Grid>
          </Grid>
        ) : null}
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
  overflow: scroll;
`

export default FindPw
