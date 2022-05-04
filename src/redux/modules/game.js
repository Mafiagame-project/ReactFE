import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer';

const SEND_SOCKET = 'SEND_SOCKET';
const NOTI = 'NOTI';
const JOB = 'JOB';
const KILLED = 'KILLED';
const SURVIVED = 'SURVIVED';
const IS_NIGHT = 'IS_NIGHT';
const COP_SELECTED = 'COP_SELECTED';


const sendSocket = createAction(SEND_SOCKET, (socket) => ({ socket }))
const noticeInfo = createAction(NOTI, (noti) => ({noti}));
const playerJob = createAction(JOB, (job) => ({job}));
const playerWhoKilled = createAction(KILLED, (player) => ({player}));
const playerWhoSurvived = createAction(SURVIVED, (player) => ({player}));
const dayAndNight = createAction(IS_NIGHT, (boolean) => ({boolean}))
const copSelected = createAction(COP_SELECTED, (selected) => ({selected}))

const initialState = {
    socket: null,
    noti : null,
    job : null,
    killed : [],
    survived : null,
    night : null,
    copSelect : null,
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
        [KILLED]: (state, action) =>
            produce(state, (draft) => {
                draft.killed = action.payload.player;
            }),
        [SURVIVED]: (state, action) =>
            produce(state, (draft) => {
                draft.survived = action.payload.player;
            }),
        [SURVIVED]: (state, action) =>
            produce(state, (draft) => {
                draft.night = action.payload.boolean;
            }),
        [COP_SELECTED]: (state, action) =>
            produce(state, (draft) => {
                draft.copSelect = action.payload.selected;
            }),
    },
    initialState,
  )

  const actionCreators = {
    sendSocket,
    noticeInfo,
    playerJob,
    playerWhoKilled,
    playerWhoSurvived,
    dayAndNight,
    copSelected,
  }
  
  export { actionCreators }