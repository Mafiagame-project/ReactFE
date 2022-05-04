import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

const KakaoLogin = (props) => {
  const dispatch = useDispatch()

  //코드 전송
  let code = new URL(window.location.href).searchParams.get('code')

  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code))
  }, [])
  return <></>
}

export default KakaoLogin
