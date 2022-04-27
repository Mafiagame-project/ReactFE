import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SEND_SOCKET = 'SEND_SOCKET';
const SEND_LIST = 'SEND_LIST';
const VIDEO_SET = 'VIDEO_SET'

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({socket, num}));
const sendRoomList = createAction(SEND_LIST, (rooms) => ({rooms}))
const videoSetting = createAction(VIDEO_SET, (video) => ({video}))

const initialState = {
    data : [],
    idx : [],
    rooms : [],
    video : [],
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
        })
    }, initialState
);

const actionCreators = {
    sendSocket,
    sendRoomList,
    videoSetting,
}

export {actionCreators}