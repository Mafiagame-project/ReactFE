//이메일
export const emailVal = () => {
  const userIdReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return userIdReg.test()
}

//닉네임 2~15자 한글,영문,숫자
export const nickVal = () => {
  const userNickReg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,15}$/
  return userNickReg.test()
}

//패스워드 4~15자 영문+숫자
export const pwVal = () => {
  const userPwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/
  return userPwReg.test()
}
