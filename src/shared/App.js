import './App.css'
import { Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'
import Gameroom from '../pages/Gameroom'

function App() {
  return (
    <>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/gameroom" component={Gameroom} />
      {/* <Route exact path="/user/kakaoLogin" component={KakaoLogin} /> */}
    </>
  )
}

export default App
