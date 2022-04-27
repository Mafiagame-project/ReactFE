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
  console.log(dic)
  const { id: userId, pw: userPw } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post('http://3.36.75.6/user/login', JSON.stringify({ userId, userPw }), {
        headers: { 'Content-Type': `application/json` },
      })
      .then((res) => {
        console.log(res)
        if (res.data.token) {
          const accessToken = res.data.token
          const userId = res.data.userId

          localStorage.setItem('token', accessToken)
          localStorage.setItem('userId', userId)
          dispatch(logIn(accessToken, userId))
          history.replace('./')
        }
      })
      .catch((err) => {
        console.log('errrrrr', err)
      })
  }
}

const signupDB = (dic) => {
  console.log(dic)
  const { id: userId, nick: userNick, pw: userPw, pwCheck: userPwCheck } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        'http://3.36.75.6/user/register',
        JSON.stringify({
          userId,
          userPw,
          userPwCheck,
          userNick,
        }),
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
        // Authorization: `Bearer${localStorage.getItem('token')}`,
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
      .get(`http://3.36.75.6/main?code=${code}`)
      .then((res) => {
        console.log(res.data)
        const accessToken = res.data.token
        const userId = res.data.userId
        const userNick = res.data.userNick

        localStorage.setItem('token', accessToken)
        localStorage.setItem('userId', userId)
        localStorage.setItem('userNick', userNick)
        dispatch(logIn(accessToken, userId, userNick))
        history.push('/')
      })
      .catch((err) => {
        console.log('에러에러', err)
      })
  }
}

const logOutDB = (user) => {
  return async function (dispatch, getState, { history }) {
    localStorage.removeItem('token', 'userId')
    dispatch(logOut(user))
    alert('로그아웃 되었습니다')
    history.replace('/login')
  }
}

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userId
        draft.token = action.payload.token
        draft.is_login = true
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),

    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.clear()
        draft.is_login = false
        draft.user = null
      }),
  },
  initialState,
)

const actionCreators = {
  kakaoLogin,
  loginDB,
  signupDB,
  isLoginDB,
  logOutDB,
}
export { actionCreators }
