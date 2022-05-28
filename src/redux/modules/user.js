// REDUX-ACTION & IMMER
import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

//Axios
import axios from 'axios'
import { apis } from '../../shared/api'

const BASE_URL = process.env.REACT_APP_BASE_URL

//Action
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const SIGN_UP = 'SIGN_UP'
const GET_FRIEND = 'GET_FRIEND'
const ADD_FRIEND = 'ADD_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'
const CHANGE_NICK = 'CHANGE_NICK'

//Action Creators
const logIn = createAction(LOG_IN, (token, userId, userNick) => ({
  token,
  userId,
  userNick,
}))
const signUp = createAction(SIGN_UP, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getFriend = createAction(GET_FRIEND, (list) => ({ list }))
const addFriend = createAction(ADD_FRIEND, (list) => ({ list }))
const deleteFriend = createAction(DELETE_FRIEND, (list) => ({ list }))
const changeNickname = createAction(CHANGE_NICK, (userNick) => ({
  userNick,
}))

//initialState
const initialState = {
  user: null,
  is_login: false,
  friendList: null,
}

//Middle Wares

const loginDB = (dic) => {
  const { id: userId, pw: userPw } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${BASE_URL}/user/login`, JSON.stringify({ userId, userPw }), {
        headers: { 'Content-Type': `application/json` },
      })
      .then((res) => {
        if (res.data.token) {
          const accessToken = res.data.token
          const userId = res.data.userId
          const userNick = res.data.userNick

          localStorage.setItem('token', accessToken)
          localStorage.setItem('userId', userId)
          localStorage.setItem('userNick', userNick)
          dispatch(logIn(accessToken, userId, userNick))
          history.replace('./')
        }
      })
      .catch((err) => {
        window.alert('아이디나 비밀번호를 확인해주세요!')
      })
  }
}

const signupDB = (dic) => {
  const {
    id: userId,
    email: email,
    nick: userNick,
    pw: userPw,
    pwCheck: userPwCheck,
  } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/register`,
        JSON.stringify({
          userId,
          email,
          userPw,
          userPwCheck,
          userNick,
        }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        dispatch(signUp())
        history.replace('/login')
      })
      .catch((err) => {
        window.alert('이미 가입된 아이디,닉네임 또는 이메일 입니다.')
      })
  }
}

const idCheck = (id) => {
  return async function (dispatch, useState, { history }) {
    apis.checkId(id)
    await axios
      .post(
        `${BASE_URL}/user/idCheck`,
        JSON.stringify({
          idCheck: id,
        }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        window.alert('사용할 수 있는 아이디입니다!')
      })
      .catch((err) => {
        window.alert('이미 사용중인 아이디입니다!')
      })
  }
}

const emailCheck = (email) => {
  return async function (dispatch, useState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/emailCheck`,
        JSON.stringify({
          emailCheck: email,
        }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        window.alert('사용할 수 있는 이메일입니다!')
      })
      .catch((err) => {
        window.alert('이미 사용중인 이메일입니다!')
      })
  }
}

const nickCheck = (nick) => {
  return async function (dispatch, useState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/userNickCheck`,
        JSON.stringify({
          userNickCheck: nick,
        }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        window.alert('사용할 수 있는 닉네임입니다!')
      })
      .catch((err) => {
        window.alert('이미 사용중인 닉네임입니다!')
      })
  }
}

const findPwDB = (dic) => {
  const { email: email, id: userId } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/findPw`,
        JSON.stringify({
          email,
          userId,
        }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        alert('메일로 새 비밀번호가 전송되었습니다!')
      })
      .catch((err) => {
        alert('등록되지 않은 이메일 또는 아이디입니다!')
      })
  }
}

const changePwDB = (dic) => {
  const {
    email: email,
    id: userId,
    getpw: password,
    newPw: newPw,
    newPwCheck: newPwCheck,
  } = dic
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/changePw`,
        JSON.stringify({
          email,
          userId,
          password,
          newPw,
          newPwCheck,
        }),
        {
          headers: { 'Content-Type': `application/json` },
        },
      )
      .then((res) => {
        alert('비밀번호가 변경되었습니다!')
        history.push('/login')
      })
      .catch((err) => {
        alert('비밀번호 변경에 실패했습니다')
      })
  }
}

const changeNickDB = (changeNick) => {
  return async function (dispatch, getState, { history }) {
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: { changeNick },
      url: `${BASE_URL}/user/changeNick`,
    })
      .then((response) => {
        alert('변경이 완료되었습니다')
        const userNick = response.data.userNick
        localStorage.getItem('userNick', userNick)
        dispatch(changeNickname(userNick))
        history.push('/gamemain')
      })
      .catch((error) => {
        alert('이미 가입된 닉네임입니다!')
      })
  }
}

//naver Login
const naverLogin = (code, state) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`${BASE_URL}/naverLogin/callback?code=${code}&state=${state}`)
      .then((res) => {
        const userId = res.data.naverId
        const userNick = res.data.naverNick
        const accessToken = res.data.token
        localStorage.setItem('token', accessToken)
        localStorage.setItem('userId', userId)
        localStorage.setItem('userNick', userNick)
        dispatch(logIn(accessToken, userId, userNick))
        history.push('/')
      })
      .catch((err) => {
        alert('로그인에 실패하였습니다!')
      })
  }
}

//kakao login
const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`${BASE_URL}/main?code=${code}`)
      .then((res) => {
        const accessToken = res.data.token
        const userId = res.data.userId
        const userNick = res.data.userNick

        localStorage.setItem('token', accessToken)
        localStorage.setItem('userId', userId)
        localStorage.setItem('userNick', userNick)
        dispatch(logIn(accessToken, userId, userNick))
        history.replace('/')
      })
      .catch((err) => {})
  }
}

const logOutDB = (user) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',
      url: `${BASE_URL}/user/logout`,
    })
      .then((res) => {
        localStorage.removeItem('token', 'userId')
        dispatch(logOut(user))
        alert('로그아웃 되었습니다')
        history.replace('/login')
      })
      .catch((err) => {})
  }
}
const addFriendDB = (friendUserId) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/friendAdd`,
        JSON.stringify({
          friendUserId,
        }),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        if (res.data.msg === '친구추가 완료') {
          dispatch(addFriend({ userId: friendUserId }))
          window.alert('친구 등록 완료!')
        } else {
          window.alert('친구가 없습니다!')
          return
        }
      })
      .catch((err) => {})
  }
}

const getFriendDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'post',
      url: `${BASE_URL}/user/friendList`,
    })
      .then((res) => {
        let list = res.data.friendList
        dispatch(getFriend(list))
      })
      .catch((err) => {})
  }
}

const deleteFriendDB = (id) => {
  return async function (dispatch, useState, { history }) {
    await axios
      .post(
        `${BASE_URL}/user/friendRemove`,
        JSON.stringify({
          removeUserId: id,
        }),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        dispatch(deleteFriend(id))
      })
      .catch((err) => {})
  }
}
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userId
        draft.token = action.payload.token
        draft.userNick = action.payload.userNick
        draft.is_login = true
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.clear()
        draft.is_login = false
        draft.user = null
      }),
    [GET_FRIEND]: (state, action) =>
      produce(state, (draft) => {
        draft.friendList = action.payload.list
      }),
    [ADD_FRIEND]: (state, action) =>
      produce(state, (draft) => {
        draft.friendList.push(action.payload.list)
      }),
    [DELETE_FRIEND]: (state, action) =>
      produce(state, (draft) => {
        let list = draft.friendList.filter(
          (e) => e.userId !== action.payload.list,
        )
        draft.friendList = [...list]
      }),
    [CHANGE_NICK]: (state, action) =>
      produce(state, (draft) => {
        draft.userNick = action.payload.userNick
      }),
  },
  initialState,
)

const actionCreators = {
  kakaoLogin,
  naverLogin,
  loginDB,
  signupDB,
  logOutDB,
  findPwDB,
  changePwDB,
  getFriendDB,
  addFriendDB,
  idCheck,
  emailCheck,
  nickCheck,
  deleteFriendDB,
  changeNickDB,
}
export { actionCreators }
