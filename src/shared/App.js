import './App.css'
import { Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'
import Gameroom from '../pages/Gameroom'
import {ConnectedRouter} from 'connected-react-router';
import {history} from'../redux/configureStore';

function App() {
  return (
    <>
    <ConnectedRouter history={history}>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/gameroom/:num" component={Gameroom} />
      </ConnectedRouter>
      {/* <Route exact path="/user/kakaoLogin" component={KakaoLogin} /> */}
    </>
  )
}

export default App
