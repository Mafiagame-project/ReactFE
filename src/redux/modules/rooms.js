import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

const SEND_LIST = 'SEND_LIST'
const CURR_MEM = 'CURR_MEM'
const EXIT = 'EXIT'
const CURR_ID = 'CURR_ID'
const EXIT_ID = 'EXIT_ID'
const HOST_IS = 'HOST_IS'
const CHANGE_DAY = 'CHANGE_DAY'

const sendRoomList = createAction(SEND_LIST, (rooms) => ({ rooms }))
const currentMember = createAction(CURR_MEM, (member) => ({ member }))
const exceptExit = createAction(EXIT, (member) => ({ member }))
const currentId = createAction(CURR_ID, (memberId) => ({ memberId }))
const exitId = createAction(EXIT_ID, (memberId) => ({ memberId }))
const findHost = createAction(HOST_IS, (host) => ({ host }))
const changeDay = createAction(CHANGE_DAY, (day) => ({ day }))

const initialState = {
  rooms: [],
  member: [],
  memberId: [],
  host: [],
  day: [],
}

export default handleActions(
  {
    [SEND_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.rooms = action.payload.rooms
      }),
    [CURR_MEM]: (state, action) =>
      produce(state, (draft) => {
        draft.member = action.payload.member
      }),
    [EXIT]: (state, action) =>
      produce(state, (draft) => {
        draft.member = draft.member.filter(
          (exit) => exit !== action.payload.member,
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
    [HOST_IS]: (state, action) =>
      produce(state, (draft) => {
        draft.host = action.payload.host
      }),
    [CHANGE_DAY]: (state, action) =>
      produce(state, (draft) => {
        draft.day = action.payload.day
      }),
  },
  initialState,
)

const actionCreators = {
  sendRoomList,
  currentMember,
  exceptExit,
  findHost,
  currentId,
  exitId,
  changeDay,
}

export { actionCreators }
