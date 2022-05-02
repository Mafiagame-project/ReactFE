import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SEND_LIST = 'SEND_LIST';
const CURR_MEM = 'CURR_MEM'
const EXIT = 'EXIT';
const HOST_IS = 'HOST_IS'

const sendRoomList = createAction(SEND_LIST, (rooms) => ({rooms}));
const currentMember = createAction(CURR_MEM, (member) => ({member}));
const exceptExit = createAction(EXIT, (member) => ({member}));
const findHost = createAction(HOST_IS, (host) => ({host}));

const initialState = {
    rooms : [],
    member : [],
    host : [],
}

export default handleActions(
    {
        [SEND_LIST] : (state, action) => produce(state, (draft) => {
            draft.rooms = action.payload.rooms;
        }),
        [CURR_MEM] : (state, action) => produce(state, (draft) => {
            draft.member = action.payload.member
        }),
        [EXIT] : (state, action) => produce(state, (draft) => {
            draft.member = action.payload.member;
        }),
        [HOST_IS] : (state, action) => produce(state, (draft) => {
            draft.host = action.payload.host;
        }),
    }, initialState
);

const actionCreators = {
    sendRoomList,
    currentMember,
    exceptExit,
    findHost,
}

export {actionCreators}
