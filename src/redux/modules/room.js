import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer';

const CURRENT_ROOM = 'CURRENT_ROOM';
const SEND_LIST = 'SEND_LIST'
const READY = 'READY'
const HOST = 'HOST'

const currentRoom = createAction(CURRENT_ROOM, (room) => ({ room }))
const sendRoomList = createAction(SEND_LIST, (rooms) => ({ rooms }))
const roomReady = createAction(READY, (toggle) => ({toggle}))
const changeHost = createAction(HOST, (host) => ({host}))


const initialState = {
    current: null,
    rooms : [],
    ready : [],
    host : null,
  }

export default handleActions(
    {
        [CURRENT_ROOM]: (state, action) =>
            produce(state, (draft) => {
                draft.current = action.payload.room
            }),
        [SEND_LIST]: (state, action) =>
            produce(state, (draft) => {
                draft.rooms = action.payload.rooms
            }),
        [READY]: (state, action) =>
            produce(state, (draft) => {
                draft.ready = action.payload.toggle
            }),
        [HOST]: (state, action) =>
            produce(state, (draft) => {
                draft.host = action.payload.host
            }),
        
    },
    initialState,
  )

  const actionCreators = {
      currentRoom,
      sendRoomList,
      roomReady,
      changeHost
  }
  
  export { actionCreators }