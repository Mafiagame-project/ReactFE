import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { history } from '../redux/configureStore'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'
import Gameroom from '../pages/Gameroom'
import KakaoLogin from './KakaoLogin'
import Loading from '../pages/Loading'
import FindPw from '../pages/FindPw'
import VideoChat from '../component/VideoChat'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  //지금 500 error
  // const is_token = localStorage.getItem('token') ? true : false

  // React.useEffect(() => {
  //   if (is_token) {
  //     dispatch(userActions.isLoginDB())
  //   }
  // }, [])
  return (
    <>
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Loading} />
        <Route exact path="/gamemain" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/findpw" component={FindPw} />
        <Route exact path="/gameroom/:num" component={Gameroom} />
        <Route exact path="/video" component={VideoChat} />
        <Route exact path="/main" component={KakaoLogin} />
      </ConnectedRouter>
    </>
  )
}

export default App
