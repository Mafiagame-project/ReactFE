import Header from '../component/Header';
import styled from 'styled-components';
import {Grid, Text, Input, Button} from '../element/index';
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as postActions} from '../redux/modules/post';
import {actionCreators as roomActions} from '../redux/modules/rooms';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import CreateModal from '../component/CreateModal';

function Main(){
    const dispatch = useDispatch();
    const RoomList = useSelector(state => state.room.rooms);
    const socket = useSelector(state => state.post.data)
    const currentId = localStorage.getItem('userId')
    const history = useHistory();
    const [getModal, setModal] = useState(false);

    const entrance = (roomInfo) => { // 방에 입장시 생기는 이벤트
        console.log(roomInfo);
        if (roomInfo.start == true) {
            alert('게임이 시작되었습니다');
            return
        } else {
            if (roomInfo.currentPeople.length >= parseInt(roomInfo.roomPeople)) {
                alert('응 못들어가')
                return;
            } else {
                if (roomInfo.password) {
                    let pwdInput = prompt('비밀번호를 입력해주세요');
                    if (pwdInput == parseInt(roomInfo.password)) {
                        history.push(`/gameroom/${roomInfo.socketId}`);
                        dispatch(postActions.sendSocket(socket, roomInfo.socketId));
                        dispatch(roomActions.findHost(roomInfo.userId));
                        dispatch(postActions.currentRoom(roomInfo));
                        socket.emit('joinRoom', roomInfo.socketId);
                    } else {
                        alert('비밀번호가 틀림 ㅋ')
                        return
                    }
                } else {
                    history.push(`/gameroom/${roomInfo.socketId}`);
                    dispatch(postActions.sendSocket(socket, roomInfo.socketId));
                    dispatch(roomActions.findHost(roomInfo.userId));
                    dispatch(postActions.currentRoom(roomInfo));
                    socket.emit('joinRoom', roomInfo.socketId);
                    console.log(socket, roomInfo.socketId);
                }
            }
        }
    }
    
    useEffect(() => {
        socket.emit('main', currentId)
        socket.emit('roomList')
        socket.on('roomList', rooms => {
            console.log(rooms)
            dispatch(roomActions.sendRoomList(rooms))
        });
        
    },[socket]);
    console.log(RoomList)
    return(
        <>
        <Header/>
        { getModal == true ? <CreateModal socket={socket} getModal={getModal} setModal={setModal} /> : null }
        <Grid width='100vw' height='25vh' padding='30px'>
            <Grid is_flex padding='0px 20px 0px 20px'>
                <Grid border padding='30px'>
                    <Text>마피아 게임 룰</Text>
                </Grid>
            </Grid>
        </Grid>
        <Grid width='100vw' height='60vh' padding='60px'>
            <Grid border padding='30px'>
            <Grid is_flex height='10%' padding='10px'>
                <Text size='25px' bold>전체 방 목록</Text>
                <Button _onClick={()=>{setModal(!getModal)}} bg='#d2d2d2' padding='10px' hoverbg='skyblue' size='15px'>방 만들기</Button>
            </Grid>
            <RoomBox>
                {RoomList.map((e) => {
                    return(
                        <Room onClick={() => {entrance(e)}}>
                            <Text size='20px' bold>{e.roomTitle}</Text>
                            <Text size='20px' bold>방장 : {e.userId}</Text>
                            <Text size='20px' bold>{e.currentPeople.length} / {e.roomPeople}</Text>
                            <Button width='30%' size='20px' padding='10px' bg='#ffb72b'>입장</Button>
                        </Room>
                    )
                })}
            </RoomBox>
            </Grid>
        </Grid>
        </>
    )
}
const RoomBox = styled.div`
width:95%;
height:60%;
padding:30px 50px 30px 10px;
overflow-x:scroll;
display:flex;
flex-direction : columns;
@media screen and (max-width: 600px) {
    height:100%;
    flex-direction : column;
}
`

const Room = styled.div`
    width:300px;
    min-width:300px;
    height:100%;
    background:#white;
    box-shadow: 2px 2px 2px 2px #d2d2d2;
    border : 1px solid #d2d2d2;
    border-radius:20px;
    margin-right : 20px;
    text-align:center;
    @media screen and (max-width: 600px) {
        min-height:200px;
        margin-bottom:20px;
    }
`
export default Main