import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer';

const SEND_SOCKET = 'SEND_SOCKET';
const NOTI = 'NOTI';
const JOB = 'JOB';


const sendSocket = createAction(SEND_SOCKET, (socket) => ({ socket }))
const noticeInfo = createAction(NOTI, (noti) => ({noti}));
const playerJob = createAction(JOB, (job) => ({job}))

const initialState = {
    socket: null,
    noti : null,
    job : null,
  }

export default handleActions(
    {
        [SEND_SOCKET]: (state, action) =>
            produce(state, (draft) => {
                draft.socket = action.payload.socket
            }),
        [NOTI]: (state, action) =>
            produce(state, (draft) => {
                draft.noti = action.payload.noti
            }),
        [JOB]: (state, action) =>
            produce(state, (draft) => {
                draft.job = action.payload.job
            }),
    },
    initialState,
  )

  const actionCreators = {
    sendSocket,
    noticeInfo,
    playerJob,
  }
  
  export { actionCreators }