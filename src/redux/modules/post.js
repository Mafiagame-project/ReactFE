import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const SEND_SOCKET = 'SEND_SOCKET';
const SEND_LIST = 'SEND_LIST';
const PLAYERS = 'PLAYERS';
const CURR_MEM = 'CURR_MEM'
const EXIT = 'EXIT'

const sendSocket = createAction(SEND_SOCKET, (socket, num) => ({socket, num}));
const sendRoomList = createAction(SEND_LIST, (rooms) => ({rooms}))
const players = createAction(PLAYERS, (jobs) => ({jobs}))
const currentMember = createAction(CURR_MEM, (member) => ({member}))
const exceptExit = createAction(EXIT, (member) => ({member}))

const initialState = {
    data : [],
    idx : [],
    rooms : [],
    jobs : [],
    member : [],
}
const gameStart = (userIds) => {
    return async function (dispatch){
        let newArray = [{}]
        userIds.forEach((e, i) => {
            newArray.push({e})
        })
        newArray.splice(0,1);
        console.log(newArray);
        await axios({
            method : 'post',
            url : 'http://3.36.75.6/game/room/:001',
            data : newArray,
        })
        .then(response => {
            console.log(response)
            const job = response.data.gameInfo.player;
            dispatch(players(job))

        })
        .catch(error => {
        })
    }
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
        [PLAYERS] : (state, action) => produce(state, (draft) => {
            draft.jobs = action.payload.jobs
        }),
        [CURR_MEM] : (state, action) => produce(state, (draft) => {
            draft.member = action.payload.member
        }),
        [EXIT] : (state, action) => produce(state, (draft) => {
            draft.member = draft.member.filter(exit => exit !== action.payload.member)
        }),
    }, initialState
);

const actionCreators = {
    sendSocket,
    sendRoomList,
    players,
    currentMember,
    exceptExit,
    gameStart,
}

export {actionCreators}