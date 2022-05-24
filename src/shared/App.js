import React from 'react'
import './App.css'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { history } from '../redux/configureStore'
import {
  Login,
  SignUp,
  FindPw,
  Main,
  Gameroom,
  Loading,
  Introduce,
  EditUser,
  EditProfile,
  Tutorial,
  MobilePage,
} from '../pages'
import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
import { useMediaQuery } from 'react-responsive'

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  return isMobile ? (
    <>
      <MobilePage />
    </>
  ) : (
    <>
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Loading} />
        <Route exact path="/gamemain" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/findpw" component={FindPw} />
        <Route exact path="/gameroom/:roomId" component={Gameroom} />
        <Route exact path="/main" component={KakaoLogin} />
        <Route exact path="/naverLogin/main" component={NaverLogin} />
        <Route exact path="/introduce" component={Introduce} />
        <Route exact path="/edituser" component={EditUser} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/tutorial" component={Tutorial} />
      </ConnectedRouter>
    </>
  )
}

export default App
