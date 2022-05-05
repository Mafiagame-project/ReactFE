import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { history } from '../redux/configureStore'
import Login from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import FindPw from '../pages/auth/FindPw'
import Main from '../pages/Main'
import Tutorial from '../pages/Tutorial'
import Gameroom from '../pages/Gameroom'
import KakaoLogin from './KakaoLogin'
import Loading from '../pages/Loading'
import Functions from './functions'
import PeerVideo from '../component/video/PeerVideo'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  return (
    <>
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Loading} />
        <Route exact path="/gamemain" component={Main} />
        <Route exact path="/tutorial" component={Tutorial} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/findpw" component={FindPw} />
        <Route exact path="/gameroom/:num" component={Gameroom} />
        <Route exact path="/main" component={KakaoLogin} />
        <Route exact path="/functions" component={Functions} />
        <Route exact path="/video" component={PeerVideo} />
      </ConnectedRouter>
    </>
  )
}

export default App
