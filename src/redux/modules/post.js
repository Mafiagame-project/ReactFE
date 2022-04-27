import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SEND_SOCKET = 'SEND_SOCKET';

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({socket, num}));

const initialState = {
    data : [],
    idx : [],
}

export default handleActions(
    {
        [SEND_SOCKET] : (state, action) => produce(state, (draft) => {
            draft.data = action.payload.socket;
            draft.idx = action.payload.num;
        })
    }, initialState
);

const actionCreators = {
    sendSocket,
}

export {actionCreators}