import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer';

import axios from 'axios'
import { Api } from '../../shared/api'

const BASE_URL = 'https://sparta-dongsun.shop'

const CURR_SOCKET = 'CURR_SOCKET';
const EXIT_SOCKET = 'EXIT_SOCKET'
const CURR_ID = 'CURR_ID'
const EXIT_ID = 'EXIT_ID'
const PROFILE_IDX = 'PROFILE_IDX'


const currentSocketId = createAction(CURR_SOCKET, (memberSocket) => ({ memberSocket }))
const exitSocketId = createAction(EXIT_SOCKET, (memberSocket) => ({ memberSocket }))
const currentUserId = createAction(CURR_ID, (memberId) => ({ memberId }))
const exitUserId = createAction(EXIT_ID, (memberId) => ({ memberId }))
const callProfileIdx = createAction(PROFILE_IDX, (num) => ({num}))


const initialState = {
   socketId : [],
   memberId : [],
   idx : null,
  }

  const callUserProfile = () => {
      return async function(dispatch){
          await axios
          ({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            url: `${BASE_URL}/user/profile`,
          })
          .then(response => {
              dispatch(callProfileIdx(response.data?.profile))
          })
          .catch((error) => {
              console.log(error)
          })
      }
  }

  const changeProfiles = (profile, token) => {
      console.log(token, profile)
    return async function (dispatch, getState, { history }) {
      await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data : {profile},
        url: `${BASE_URL}/user/profile`,
      })
        .then((res) => {
          dispatch(callProfileIdx(profile))
          
        })
        .catch((err) => {
          console.log('errrrrr', err)
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
      callProfileIdx
  }
  
  export { actionCreators }