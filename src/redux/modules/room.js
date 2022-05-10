import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer';

const CURRENT_ROOM = 'CURRENT_ROOM';
const SEND_LIST = 'SEND_LIST'
const READY = 'READY'

const currentRoom = createAction(CURRENT_ROOM, (room) => ({ room }))
const sendRoomList = createAction(SEND_LIST, (rooms) => ({ rooms }))
const roomReady = createAction(READY, (toggle) => ({toggle}))


const initialState = {
    current: null,
    rooms : [],
    ready : [],
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
        
    },
    initialState,
  )

  const actionCreators = {
      currentRoom,
      sendRoomList,
      roomReady
  }
  
  export { actionCreators }