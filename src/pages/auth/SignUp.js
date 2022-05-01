import React from 'react'
import { history } from '../../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Input, Grid, Button, Text, Image } from '../../element/index'
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

  return (
    <>
      <Container>
        <Grid flex_column>
          <Text size="20px" bold>
            Sign up
          </Text>
          <Form onSubmit={formik.handleSubmit}>
            <Input
              id="id"
              label="ID"
              value={formik.values.id}
              autoComplete="off"
              _onChange={formik.handleChange}
              placeholder="아이디를 입력해주세요"
            />
            <Text>{formik.touched.id ? formik.errors.id : ''}</Text>
            <Input
              id="email"
              label="Email"
              autoComplete="off"
              value={formik.values.email}
              _onChange={formik.handleChange}
              placeholder="이메일을 입력해주세요"
            />
            <Text>{formik.touched.email ? formik.errors.email : ''}</Text>
            <Input
              id="nick"
              label="Nickname"
              autoComplete="off"
              value={formik.values.nick}
              _onChange={formik.handleChange}
              placeholder="닉네임은 2~15자 한글,영문,숫자만 가능합니다"
            />
            <Text>{formik.touched.nick ? formik.errors.nick : ''}</Text>
            <Input
              id="pw"
              label="Password"
              value={formik.values.pw}
              autoComplete="off"
              type="password"
              _onChange={formik.handleChange}
              placeholder="패스워드 4~15자 영문+숫자만 가능합니다"
            />
            <Text>{formik.touched.pw ? formik.errors.pw : ''}</Text>
            <Input
              id="pwCheck"
              label="Password"
              value={formik.values.pwCheck}
              autoComplete="off"
              type="password"
              _onChange={formik.handleChange}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <Text>{formik.touched.pwCheck ? formik.errors.pwCheck : ''}</Text>
            <button type="submit" value="회원가입" variant="contained">
              회원가입
            </button>
          </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
export default SignUp
