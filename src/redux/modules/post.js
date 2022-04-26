import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SEND_SOCKET = 'SEND_SOCKET';

const sendSocket = createAction(SEND_SOCKET, (socket) => ({socket}));

const initialState = {
    data : [],
}

export default handleActions(
    {
        [SEND_SOCKET] : (state, action) => produce(state, (draft) => {
            draft.data = action.payload.socket;
        })
    }, initialState
);

const actionCreators = {
    sendSocket,
}

export {actionCreators}