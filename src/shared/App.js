import React from 'react'
import './App.css'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { history } from '../redux/configureStore'
import Login from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import FindPw from '../pages/auth/FindPw'
import Main from '../pages/Main'
import Gameroom from '../pages/Gameroom'
import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
import Loading from '../pages/Loading'
import Functions from './functions'
import Introduce from '../pages/Introduce'
import EditUser from '../pages/auth/EditUser'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  return (
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
        <Route exact path="/functions" component={Functions} />
        <Route exact path="/introduce" component={Introduce} />
        <Route exact path="/edituser" component={EditUser} />
      </ConnectedRouter>
    </>
  )
}

export default App
