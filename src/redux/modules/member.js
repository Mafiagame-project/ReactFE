import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer';

const CURR_SOCKET = 'CURR_SOCKET';
const EXIT_SOCKET = 'EXIT_SOCKET'
const CURR_ID = 'CURR_ID'
const EXIT_ID = 'EXIT_ID'


const currentSocketId = createAction(CURR_SOCKET, (memberSocket) => ({ memberSocket }))
const exitSocketId = createAction(EXIT_SOCKET, (memberSocket) => ({ memberSocket }))
const currentUserId = createAction(CURR_ID, (memberId) => ({ memberId }))
const exitUserId = createAction(EXIT_ID, (memberId) => ({ memberId }))


const initialState = {
   socketId : [],
   memberId : [],
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
    },
    initialState,
  )

  const actionCreators = {
    currentSocketId,
      exitSocketId,
      currentUserId,
      exitUserId,
  }
  
  export { actionCreators }