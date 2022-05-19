import * as Yup from 'yup'

export function idVal() {
  let idReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/
  return Yup.string('')
    .matches(idReg, { message: '영문/숫자 포함 4~15자를 입력해주세요' })
    .required('아이디를 입력해주세요!')
}

export function emailVal() {
  return Yup.string('')
    .email('올바른 이메일을 입력해주세요')
    .required('이메일 주소를 입력해주세요!')
}
export function nickVal() {
  let nickReg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,15}$/
  return Yup.string('')
    .matches(nickReg, { message: '한글/영문/숫자 2~15자를 입력해주세요' })
    .required('닉네임을 입력해주세요!')
}

export function pwVal() {
  let pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/
  return Yup.string('')
    .matches(pwReg, { message: '영문/숫자 포함 4~15자를 입력해주세요' })
    .required('패스워드를 입력해주세요!')
}
