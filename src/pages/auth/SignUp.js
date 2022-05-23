import React from 'react'
import { history } from '../../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Input, Grid, Text, DotButton, Button } from '../../element/index'
import styled from 'styled-components'
import { actionCreators as userActions } from '../../redux/modules/user'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { idVal, emailVal, nickVal, pwVal } from '../../shared/Validation'

function SignUp() {
  const dispatch = useDispatch()

  //formik의 formprops 역할을 해주는 데이터
  const formik = useFormik({
    initialValues: {
      id: '',
      email: '',
      nick: '',
      pw: '',
      pwCheck: '',
    },
    validationSchema: yup.object({
      id: idVal(),
      email: emailVal(),
      nick: nickVal(),
      pw: pwVal(),
      pwCheck: yup
        .string()
        .oneOf([yup.ref('pw'), null], '패스워드가 일치하지 않아요')
        .required('패스워드를 확인 해주세요!'),
    }),
    onSubmit: (values) => dispatch(userActions.signupDB(values)),
  })

  const doubleIdCheck = () => {
    dispatch(userActions.idCheck(formik.values.id))
  }
  const doubleNickCheck = () => {
    dispatch(userActions.nickCheck(formik.values.nick))
  }
  const doubleEmailCheck = () => {
    dispatch(userActions.emailCheck(formik.values.email))
  }

  return (
    <Container>
      <Text size="25px" margin="13px 0">
        회원가입
      </Text>
      <Grid flex_column>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            auth
            id="id"
            value={formik.values.id}
            autoComplete="off"
            _onChange={formik.handleChange}
            placeholder="아이디"
          />
          <DotButton text="중복확인" _onClick={doubleIdCheck} />
          <Text margin="0px 3px" color="red">
            {formik.touched.id ? formik.errors.id : ''}
          </Text>
          <Input
            auth
            id="email"
            autoComplete="off"
            value={formik.values.email}
            _onChange={formik.handleChange}
            placeholder="이메일"
          />
          <DotButton text="중복확인" _onClick={doubleEmailCheck} />
          <Text margin="0px 3px" color="red">
            {formik.touched.email ? formik.errors.email : ''}
          </Text>
          <Input
            auth
            id="nick"
            autoComplete="off"
            value={formik.values.nick}
            _onChange={formik.handleChange}
            placeholder="닉네임"
          />
          <DotButton text="중복확인" _onClick={doubleNickCheck} />
          <Text margin="0px 3px" color="red">
            {formik.touched.nick ? formik.errors.nick : ''}
          </Text>
          <Input
            auth
            id="pw"
            value={formik.values.pw}
            autoComplete="off"
            type="password"
            _onChange={formik.handleChange}
            placeholder="비밀번호"
          />
          <Text margin="0px 3px" color="red">
            {formik.touched.pw ? formik.errors.pw : ''}
          </Text>
          <Input
            auth
            id="pwCheck"
            value={formik.values.pwCheck}
            autoComplete="off"
            type="password"
            _onChange={formik.handleChange}
            placeholder="비밀번호 확인"
          />
          <Text margin="0px 3px" color="red">
            {formik.touched.pwCheck ? formik.errors.pwCheck : ''}
          </Text>
          <Grid is_flex margin="30px 0 0">
            <DotButton
              white01
              text="취소"
              _onClick={() => {
                history.push('/login')
              }}
            />

            <DotButton test01 _type="submit" />
          </Grid>
        </Form>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  justify-content: center;
  max-width: 356px;
  margin: 80px auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export default SignUp
