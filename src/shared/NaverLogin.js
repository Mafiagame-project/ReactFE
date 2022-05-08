import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, useLocation } from 'react-router-dom'

//네이버 설정 여쭤보고 추후 연결 하기...어렵네요 네이버 로그인,,
const { naver } = window
const location = useLocation()
const NAVER_CALLBACK_URL = 'NAVER_CALLBACK_URL'
const NAVER_CLIENT_ID = '클라이언트 ID'

const NaverLogin = () => {
  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: false,
    loginButton: { color: 'white', type: 1, height: '47' },
  })
  naverLogin.init()
}

const getNaverToken = () => {
  if (!location.hash) return
  const token = location.hash.split('=')[1].split('&')[0]
  console.log(token)
}

React.useEffect(() => {
  NaverLogin()
  getNaverToken()
}, [])

export default NaverLogin
