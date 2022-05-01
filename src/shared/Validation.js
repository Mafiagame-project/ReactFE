import * as Yup from 'yup'

export function idVal() {
  return Yup.string('')
    .max(12, '아이디는 2~12자 사이로 지어주세요')
    .min(2, '아이디는 2~12자 사이로 지어주세요')
    .required('아이디를 입력해주세요')
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

//이메일
// export const emailVal = () => {
//   const userIdReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
//   return userIdReg.test()
// }

// //닉네임 2~15자 한글,영문,숫자
// export const nickVal = () => {
//   const userNickReg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,15}$/
//   return userNickReg.test()
// }

// //패스워드 4~15자 영문+숫자
// export const pwVal = () => {
//   const userPwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/
//   return userPwReg.test()
// }
