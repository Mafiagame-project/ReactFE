import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

const SEND_SOCKET = 'SEND_SOCKET'
const JOB_NOTI = 'JOB_NOTI'
const RESULT_NOTI = 'RESULT_NOTI'
const RESULT_NOTI2 = 'RESULT_NOTI2'
const REP_NOTI = 'REP_NOTI'
const ENDGAME_NOTI = 'ENDGAME_NOTI'
const JOB = 'JOB'
const KILLED = 'KILLED'
const SURVIVED = 'SURVIVED'
const IS_NIGHT = 'IS_NIGHT'
const START_CARD = 'START_CARD'
const DAY_CNT = 'DAY_CNT'
const CHANCE = 'CHANCE'
const VOTE_RESULT = 'VOTE_RESULT'
const AI_PLAYER = 'AI_PLAYER'

const sendSocket = createAction(SEND_SOCKET, (socket) => ({ socket }))
const noticeJob = createAction(JOB_NOTI, (noti) => ({ noti }))
const noticeResult = createAction(RESULT_NOTI, (noti) => ({ noti }))
const noticeResultNight = createAction(RESULT_NOTI2, (noti) => ({ noti }))
const noticeRep = createAction(REP_NOTI, (noti) => ({ noti }))
const noticeEndGame = createAction(ENDGAME_NOTI, (noti) => ({ noti }))
const playerJob = createAction(JOB, (job) => ({ job }))
const playerWhoKilled = createAction(KILLED, (player) => ({ player }))
const playerWhoSurvived = createAction(SURVIVED, (player) => ({ player }))
const dayAndNight = createAction(IS_NIGHT, (boolean) => ({ boolean }))
const startCard = createAction(START_CARD, (card) => ({ card }))
const dayCount = createAction(DAY_CNT, (num) => ({ num }))
const repChanceOver = createAction(CHANCE, (chance) => ({ chance }))
const checkIsMafia = createAction(VOTE_RESULT, (job) => ({ job }))
const aiPlayer = createAction(AI_PLAYER, (ai) => ({ ai }))

const initialState = {
  ai: null,
  socket: null,
  peerId: null,
  jobNoti: null,
  resultNoti: null,
  resultNight: null,
  repNoti: null,
  endGameNoti: null,
  job: null,
  killed: [],
  survived: null,
  night: null,
  card: null,
  cnt: 0,
  chance: null,
  votedJob: null,
  ai: null,
}

export default handleActions(
  {
    [SEND_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = action.payload.socket
      }),
    [JOB_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.jobNoti = action.payload.noti
      }),
    [RESULT_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.resultNoti = action.payload.noti
      }),
    [RESULT_NOTI2]: (state, action) =>
      produce(state, (draft) => {
        draft.resultNight = action.payload.noti
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
    [START_CARD]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.card == true) {
          draft.card = true
        } else {
          draft.card = false
        }
      }),

    [DAY_CNT]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.num === 0) {
          draft.cnt = 0
        } else {
          let count = 1
          draft.cnt = draft.cnt + count
        }
      }),
    [CHANCE]: (state, action) =>
      produce(state, (draft) => {
        draft.chance = action.payload.chance
      }),
    [VOTE_RESULT]: (state, action) =>
      produce(state, (draft) => {
        draft.votedJob = action.payload.job
      }),
    [AI_PLAYER]: (state, action) =>
      produce(state, (draft) => {
        draft.ai = action.payload.ai
      }),
  },
  initialState,
)
const actionCreators = {
  sendSocket,
  playerJob,
  playerWhoKilled,
  playerWhoSurvived,
  dayAndNight,
  noticeJob,
  noticeResult,
  noticeResultNight,
  noticeEndGame,
  startCard,
  noticeRep,
  dayCount,
  repChanceOver,
  checkIsMafia,
  aiPlayer,
}

export { actionCreators }
