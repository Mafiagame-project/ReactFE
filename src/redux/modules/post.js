import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SEND_SOCKET = 'SEND_SOCKET';
const SEND_LIST = 'SEND_LIST';

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({socket, num}));
const sendRoomList = createAction(SEND_LIST, (rooms) => ({rooms}))

const initialState = {
    data : [],
    idx : [],
    rooms : [],
}

export default handleActions(
    {
        [SEND_SOCKET] : (state, action) => produce(state, (draft) => {
            draft.data = action.payload.socket;
            draft.idx = action.payload.num;
        }),
        [SEND_LIST] : (state, action) => produce(state, (draft) => {
            draft.rooms = action.payload.rooms;
        })
    }, initialState
);

const actionCreators = {
    sendSocket,
    sendRoomList,
}

export {actionCreators}