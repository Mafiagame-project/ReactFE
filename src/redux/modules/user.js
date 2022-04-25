// REDUX-ACTION & IMMER
import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

//Axios
import axios from 'axios'

//Action
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const SIGN_UP = 'SIGN_UP'
const SET_USER = 'SET_USER'

//Action Creators
const logIn = createAction(LOG_IN, (token, user) => ({ token, user }))
const signUp = createAction(SIGN_UP, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))

//initialState
const initialState = {
  user: null,
  is_login: false,
}

//Middle Wares

const loginDB = (dic) => {
  return async function (dispatch, getState, { history }) {
    const { id: userId, pw: userPw } = dic
    await axios
      .post('http://3.36.75.6/user/login', JSON.stringify({ userId, userPw }), {
        headers: { 'Content-Type': `application/json` },
      })
      .then((res) => {
        console.log(res)
        if (res.data.token) {
          const accessToken = res.data.token
          localStorage.setItem('token', accessToken)
          dispatch(logIn(accessToken))
          history.replace('./')
        }
      })
      .catch((err) => {
        console.log('errrrrr', err)
      })
  }
}

const signupDB = (dic) => {
  const { id: userId, pw: userPw, pw_check: userPwCheck, nick: userNick } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        'http://3.36.75.6/user/register',
        JSON.stringify({ userId, userPw, userPwCheck, userNick }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        console.log(res.data)
        dispatch(signUp())
        history.replace('/login')
      })
      .catch((err) => {
        console.log('errrrrr', err)
      })
  }
}

//header에 토큰 올려야하는지 여쭤보기
const isLoginDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
      method: 'get',
      url: 'http://3.36.75.6/user/loginCheck',
    })
      .then((res) => {
        console.log(res)
        dispatch(
          setUser({
            userId: res.data.userId,
            userNick: res.data.userNick,
          }),
        )
      })
      .catch((err) => {
        console.log('errrr', err)
      })
  }
}

//kakao login
const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    console.log(code)
    await axios
      .get(`http://3.36.75.6/user/kakaoLogin?code=${code}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log('에러에러', err)
      })
  }
}

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.token = action.payload.token
        draft.is_login = true
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),

    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
      }),
  },
  initialState,
)

const actionCreators = {
  kakaoLogin,
  loginDB,
  signupDB,
  isLoginDB,
}
export { actionCreators }
