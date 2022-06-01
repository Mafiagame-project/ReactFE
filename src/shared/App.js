import React, { Suspense } from 'react'
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
  NotFound,
} from '../pages'
import Information from '../pages/Information'
import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
import { useMediaQuery } from 'react-responsive'

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 499px)' })
  return isMobile ? (
    <>
      <MobilePage />
    </>
  ) : (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ConnectedRouter history={history}>
          <Route exact path="/" component={Loading} />
          <Route exact path="/gamemain" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/findpw" component={FindPw} />
          <Route exact path="/gameroom/:roomId" component={Gameroom} />
          <Route exact path="/main" component={KakaoLogin} />
          <Route exact path="/naverLogin/callback" component={NaverLogin} />
          <Route exact path="/introduce" component={Introduce} />
          <Route exact path="/edituser" component={EditUser} />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route exact path="/tutorial" component={Tutorial} />
          <Route exact path="/information" component={Information} />
          {/* <Route path="*" component={NotFound} /> */}
        </ConnectedRouter>
      </Suspense>
    </>
  )
}

export default App
