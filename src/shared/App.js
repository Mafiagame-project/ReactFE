import './App.css';
import {Route} from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';

function App() {
  return (
    <>
      <Route exact path='/' component={Main}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/signup' component={SignUp}/>
    </>
  );
}

export default App;
