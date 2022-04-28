import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SEND_SOCKET = 'SEND_SOCKET';
const SEND_LIST = 'SEND_LIST';
const VIDEO_SET = 'VIDEO_SET'
const CURR_MEM = 'CURR_MEM'
const EXIT = 'EXIT'

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({socket, num}));
const sendRoomList = createAction(SEND_LIST, (rooms) => ({rooms}))
const videoSetting = createAction(VIDEO_SET, (video) => ({video}))
const currentMember = createAction(CURR_MEM, (member) => ({member}))
const exceptExit = createAction(EXIT, (member) => ({member}))

const initialState = {
    data : [],
    idx : [],
    rooms : [],
    video : [],
    member : [],
}

export default handleActions(
    {
        [SEND_SOCKET] : (state, action) => produce(state, (draft) => {
            draft.data = action.payload.socket;
            draft.idx = action.payload.num;
        }),
        [SEND_LIST] : (state, action) => produce(state, (draft) => {
            draft.rooms = action.payload.rooms;
        }),
        [VIDEO_SET] : (state, action) => produce(state, (draft) => {
            draft.video = action.payload.video;
        }),
        [CURR_MEM] : (state, action) => produce(state, (draft) => {
            draft.member = [...draft.member, action.payload.member]
        }),
        [EXIT] : (state, action) => produce(state, (draft) => {
            draft.member = draft.member.filter(exit => exit !== action.payload.member)
        }),
    }, initialState
);

const actionCreators = {
    sendSocket,
    sendRoomList,
    videoSetting,
    currentMember,
    exceptExit,
}

export {actionCreators}