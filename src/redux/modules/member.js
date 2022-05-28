import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const CURR_SOCKET = 'CURR_SOCKET'
const EXIT_SOCKET = 'EXIT_SOCKET'
const CURR_ID = 'CURR_ID'
const EXIT_ID = 'EXIT_ID'
const PROFILE_IDX = 'PROFILE_IDX'
const RECORD = 'RECORD'
const CHANGE_NICK = 'CHANGE_NICK'
const AI_MEMBER = 'AI_MEMBER'

const currentSocketId = createAction(CURR_SOCKET, (memberSocket) => ({
  memberSocket,
}))
const exitSocketId = createAction(EXIT_SOCKET, (memberSocket) => ({
  memberSocket,
}))
const currentUserId = createAction(CURR_ID, (memberId) => ({ memberId }))
const exitUserId = createAction(EXIT_ID, (memberId) => ({ memberId }))
const callProfileIdx = createAction(PROFILE_IDX, (num) => ({ num }))
const callGameRecord = createAction(RECORD, (win, lose) => ({ win, lose }))
const changeNick = createAction(CHANGE_NICK, (nick) => ({ nick }))
const aiMember = createAction(AI_MEMBER, (aiId) => ({ aiId }))

const initialState = {
  socketId: [],
  memberId: [],
  voteList: [],
  idx: null,
  win: null,
  lose: null,
  nickName: null,
}

const callPlayerRecord = () => {
  return async function (dispatch) {
    await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      url: 'https://sparta-dongsun.shop/user/gameRecord',
    })
      .then((response) => {
        const win = response.data?.userWin
        const lose = response.data?.userLose
        dispatch(callGameRecord(win, lose))
      })
      .catch((error) => {})
  }
}

const callUserProfile = () => {
  return async function (dispatch) {
    await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      url: `${BASE_URL}/user/profile`,
    })
      .then((response) => {
        dispatch(callProfileIdx(response.data?.profile))
      })
      .catch((error) => {
        alert('로그아웃 후 다시 로그인을 해주세요')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        window.localStorage.removeItem('userNick')
      })
  }
}

const changeProfiles = (profile, token) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: { profile },
      url: `${BASE_URL}/user/profile`,
    })
      .then((res) => {
        dispatch(callProfileIdx(profile))
      })
      .catch((err) => {
        alert('일시적 오류로 인해 아이콘 변경에 실패했습니다')
        history.replace('/edituser')
      })
  }
}

export default handleActions(
  {
    [CURR_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socketId = action.payload.memberSocket
      }),
    [EXIT_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socketId = draft.socketId.filter(
          (exit) => exit !== action.payload.memberSocket,
        )
      }),
    [CURR_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.memberId = action.payload.memberId
      }),
    [EXIT_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.memberId = draft.memberId.filter(
          (exit) => exit !== action.payload.memberId,
        )
      }),
    [PROFILE_IDX]: (state, action) =>
      produce(state, (draft) => {
        draft.idx = action.payload.num
      }),
    [RECORD]: (state, action) =>
      produce(state, (draft) => {
        draft.win = action.payload.win
        draft.lose = action.payload.lose
      }),
    [CHANGE_NICK]: (state, action) =>
      produce(state, (draft) => {
        draft.nickName = action.payload.nick
      }),
    [AI_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        let members = draft.memberId
        if (action.payload.aiId) {
          let list = members.concat(action.payload.aiId)
          draft.voteList = list
        } else {
          draft.voteList = members
        }
      }),
  },
  initialState,
)

const actionCreators = {
  currentSocketId,
  exitSocketId,
  currentUserId,
  exitUserId,
  changeProfiles,
  callUserProfile,
  callProfileIdx,
  callPlayerRecord,
  callGameRecord,
  changeNick,
  aiMember,
}

export { actionCreators }
