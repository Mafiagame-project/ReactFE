import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as userAction } from '../redux/modules/user'

const NaverLogin = () => {
  const dispatch = useDispatch()

  let code = new URL(window.location.href).searchParams.get('code')
  let state = new URL(window.location.href).searchParams.get('state')

  React.useEffect(() => {
    dispatch(userAction.naverLogin(code, state))
  }, [])
}

export default NaverLogin
