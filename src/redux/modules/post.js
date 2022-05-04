import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import axios from 'axios'

const SEND_SOCKET = 'SEND_SOCKET'
const PLAYERS = 'PLAYERS'
const CR_ROOM = 'CR_ROOM'
const TO_NIGHT = 'TO_NIGHT'
const NOTI = 'NOTI';
const IS_NIGHT = 'IS_NIGHT';
const MINUTE = 'MINUTE';
const SET_DAY = 'SET_DAY'
const SET_NIGHT = 'SET_NIGHT'

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({ socket, num }))
const players = createAction(PLAYERS, (jobs) => ({ jobs }))
const currentRoom = createAction(CR_ROOM, (room) => ({ room }))
const toNights = createAction(TO_NIGHT, (rull) => ({ rull }))
const notification = createAction(NOTI, (noti) => ({noti}));
const isNight = createAction(IS_NIGHT, (isNight) => ({isNight}));
const sendTime = createAction(MINUTE, (time) => ({time}));
const setDay = createAction(SET_DAY);
const setNight = createAction(SET_NIGHT);

const initialState = {
  data: [],
  idx: [],
  jobs: [],
  member: [],
  croom: [],
  night: [],
  noti : [],
  isNight : false,
  second : [],
}
const gameStart = (userIds, roomNum) => {
  return async function (dispatch) {
    let newArray = [{}]
    userIds.forEach((e, i) => {
      newArray.push({ e })
    })
    newArray.splice(0, 1)
    console.log(newArray, roomNum)
    await axios({
      method: 'post',
      url: `http://3.36.75.6/game/room/${roomNum}`,
      data: newArray,
    })
      .then((response) => {
        console.log(response)
        const job = response.data.gameInfo.player
        dispatch(players(job))
      })
      .catch((error) => {})
  }
}

const toNight = (roomNum) => {
  return async function (dispatch) {
    await axios({
      method: 'post',
      url: `http://3.36.75.6/game/rull/${roomNum}`,
      data: '',
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {})
  }
}

export default handleActions(
  {
    [SEND_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.socket
        draft.idx = action.payload.num
      }),
    [PLAYERS]: (state, action) =>
      produce(state, (draft) => {
        draft.jobs = action.payload.jobs
      }),
    [CR_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.croom = action.payload.room
      }),
    [TO_NIGHT]: (state, action) =>
      produce(state, (draft) => {
        draft.night = action.payload.rull
      }),
    [NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.noti = action.payload.noti
      }),
    [MINUTE]: (state, action) =>
      produce(state, (draft) => {
        draft.second = action.payload.time
      }),
    [SET_DAY]: (state, action) =>
      produce(state, (draft) => {
        console.log('setDay', state.isNight);
        draft.isNight = false;
      }),
    [SET_NIGHT]: (state, action) =>
      produce(state, (draft) => {
        console.log('setNight', state.isNight);
        draft.isNight = true;
      }),
    [IS_NIGHT]: (state, action) =>
      produce(state, (draft) => {
        console.log(state)
        if(action.payload.isNight == true){
          draft.isNight = false;
        } else {
          draft.isNight = true;
        }
      }),
      
  },
  initialState,
)

const actionCreators = {
  sendSocket,
  players,
  gameStart,
  currentRoom,
  toNight,
  toNights,
  notification,
  isNight,
  sendTime,
  setDay,
  setNight,
  
}

export { actionCreators }
