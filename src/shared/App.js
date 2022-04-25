import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { history } from '../redux/configureStore'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'
import Gameroom from '../pages/Gameroom'
import KakaoLogin from './KakaoLogin'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

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
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/gameroom" component={Gameroom} />
        <Route exact path="/main" component={KakaoLogin} />
      </ConnectedRouter>
    </>
  )
}

export default App
