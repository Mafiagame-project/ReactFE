import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

const SEND_SOCKET = 'SEND_SOCKET'
const SEND_PEERID = 'SEND_PEERID'
const ROOM_NOTI = 'ROOM_NOTI'
const JOB_NOTI = 'JOB_NOTI'
const RESULT_NOTI = 'RESULT_NOTI'
const COP_NOTI = 'COP_NOTI'
const REP_NOTI = 'REP_NOTI'
const ENDGAME_NOTI = 'ENDGAME_NOTI'
const JOB = 'JOB'
const KILLED = 'KILLED'
const SURVIVED = 'SURVIVED'
const IS_NIGHT = 'IS_NIGHT'
const COP_SELECTED = 'COP_SELECTED'
const ALL_READY = 'ALL_READY'
const START_CARD = 'START_CARD'
const DAY_CNT = 'DAY_CNT'

const sendSocket = createAction(SEND_SOCKET, (socket) => ({ socket }))
const sendPeerId = createAction(SEND_PEERID, (peer) => ({ peer }))
const noticeEnterOut = createAction(ROOM_NOTI, (noti) => ({ noti }))
// 들어오고 나가고의 알림 없다면 삭제
const noticeJob = createAction(JOB_NOTI, (noti) => ({ noti }))
const noticeResult = createAction(RESULT_NOTI, (noti) => ({ noti }))
const noticeCop = createAction(COP_NOTI, (noti) => ({ noti }))
const noticeRep = createAction(REP_NOTI, (noti) => ({ noti }))
const noticeEndGame = createAction(ENDGAME_NOTI, (noti) => ({ noti }))
const playerJob = createAction(JOB, (job) => ({ job }))
const playerWhoKilled = createAction(KILLED, (player) => ({ player }))
const playerWhoSurvived = createAction(SURVIVED, (player) => ({ player }))
const dayAndNight = createAction(IS_NIGHT, (boolean) => ({ boolean }))
const copSelected = createAction(COP_SELECTED, (selected) => ({ selected }))
const readyCheck = createAction(ALL_READY, (ready) => ({ready}))
const startCard = createAction(START_CARD, (card) => ({card}))
const dayCount = createAction(DAY_CNT)

const initialState = {
  socket: null,
  peerId : null,
  enterOutNoti: null,
  jobNoti: null,
  resultNoti: null,
  copNoti: null,
  repNoti: null,
  endGameNoti: null,
  job: null,
  killed: [],
  survived: null,
  night: null,
  copSelect: null,
  ready: null,
  card : null,
  cnt : 0,
}

export default handleActions(
  {
    [SEND_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = action.payload.socket
      }),
    [SEND_PEERID]: (state, action) =>
      produce(state, (draft) => {
        draft.peerId = action.payload.peer
      }),
    [ROOM_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.enterOutNoti = action.payload.noti
      }),
    [JOB_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.jobNoti = action.payload.noti
      }),
    [RESULT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.resultNoti = action.payload.noti
      }),
    [COP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.copNoti = action.payload.noti
      }),
    [REP_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.repNoti = action.payload.noti
      }),
    [ENDGAME_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.endGameNoti = action.payload.noti
      }),
    [JOB]: (state, action) =>
      produce(state, (draft) => {
        draft.job = action.payload.job
      }),
    [KILLED]: (state, action) =>
      produce(state, (draft) => {
        draft.killed = action.payload.player
      }),
    [SURVIVED]: (state, action) =>
      produce(state, (draft) => {
        draft.survived = action.payload.player
      }),
    [IS_NIGHT]: (state, action) =>
      produce(state, (draft) => {
        draft.night = action.payload.boolean
      }),
    [COP_SELECTED]: (state, action) =>
      produce(state, (draft) => {
        draft.copSelect = action.payload.selected
      }),
    [START_CARD]: (state, action) =>
      produce(state, (draft) => {
        if(action.payload.card == true){
          draft.card = true
        } else {
          draft.card = false
        }
      }),
    [ALL_READY]: (state, action) =>
      produce(state, (draft) => {
        draft.ready = action.payload.ready
      }),
    [DAY_CNT]: (state, action) =>
      produce(state, (draft) => {
        let count = 1;
        draft.cnt = draft.cnt + count;
      }),
  },
  initialState,
)
const actionCreators = {
  sendSocket,
  sendPeerId,
  noticeEnterOut,
  playerJob,
  playerWhoKilled,
  playerWhoSurvived,
  dayAndNight,
  copSelected,
  noticeJob,
  noticeResult,
  noticeCop,
  noticeEndGame,
  startCard,
  readyCheck,
  noticeRep,
  dayCount,
}

export { actionCreators }
