import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import axios from 'axios'

const SEND_SOCKET = 'SEND_SOCKET'
const PLAYERS = 'PLAYERS'
const CR_ROOM = 'CR_ROOM'
const TO_NIGHT = 'TO_NIGHT'

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({ socket, num }))
const players = createAction(PLAYERS, (jobs) => ({ jobs }))
const currentRoom = createAction(CR_ROOM, (room) => ({ room }))
const toNights = createAction(TO_NIGHT, (rull) => ({ rull }))

const initialState = {
  data: [],
  idx: [],
  jobs: [],
  member: [],
  croom: [],
  night: [],
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
}

export { actionCreators }
