import React from 'react'
import * as yup from 'yup'
import { history } from '../../redux/configureStore'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { Input, Grid, Text, DotButton } from '../../element/index'
import { idVal, emailVal, nickVal, pwVal } from '../../shared/Validation'
import { clickSF, deniedSF } from '../../element/Sound'
import edit from '../../assets/icons/black/중복확인.png'

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
    if (formik.values.id === '') {
      deniedSF.play()
      alert('아이디를 입력하세요!')

      return
    } else {
      clickSF.play()
      dispatch(userActions.idCheck(formik.values.id))
    }
  }

  const doubleNickCheck = () => {
    if (formik.values.nick === '') {
      deniedSF.play()
      alert('닉네임을 입력하세요!')

      return
    } else {
      clickSF.play()
      dispatch(userActions.nickCheck(formik.values.nick))
    }
  }
  const doubleEmailCheck = () => {
    if (formik.values.email === '') {
      deniedSF.play()
      alert('이메일을 입력하세요!')

      return
    } else {
      clickSF.play()
      dispatch(userActions.emailCheck(formik.values.email))
    }
  }

  return (
    <Container>
      <Text size="25px" margin="13px 0">
        회원가입
      </Text>
      <Grid>
        <Form onSubmit={formik.handleSubmit}>
          <Grid is_flex>
            <Input
              auth
              id="id"
              value={formik.values.id}
              autoComplete="off"
              _onChange={formik.handleChange}
              placeholder="아이디"
            />
            <img
              src={edit}
              alt="중복확인"
              onClick={doubleIdCheck}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Text margin="0px 3px" color="red">
            {formik.touched.id ? formik.errors.id : ''}
          </Text>
          <Grid is_flex>
            <Input
              auth
              id="email"
              autoComplete="off"
              value={formik.values.email}
              _onChange={formik.handleChange}
              placeholder="이메일"
            />
            <img
              src={edit}
              alt="중복확인"
              onClick={doubleEmailCheck}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Text margin="0px 3px" color="red">
            {formik.touched.email ? formik.errors.email : ''}
          </Text>
          <Grid is_flex>
            <Input
              auth
              id="nick"
              autoComplete="off"
              value={formik.values.nick}
              _onChange={formik.handleChange}
              placeholder="닉네임"
            />
            <img
              src={edit}
              alt="중복확인"
              onClick={doubleNickCheck}
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Text margin="0px 3px" color="red">
            {formik.touched.nick ? formik.errors.nick : ''}
          </Text>
          <Input
            auth
            id="pw"
            auth_width="318px"
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
            auth_width="318px"
            _onChange={formik.handleChange}
            placeholder="비밀번호 확인"
          />
          <Text margin="0px 3px" color="red">
            {formik.touched.pwCheck ? formik.errors.pwCheck : ''}
          </Text>
          <Grid isFlex_center margin="20px 0 0" width="84%">
            <DotButton
              white01
              text="취소"
              _onClick={() => {
                clickSF.play()
                history.push('/login')
              }}
            />

            <DotButton test01 _type="submit" _onClick={() => clickSF.play()} />
          </Grid>
        </Form>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 80px auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export default SignUp
