import Header from '../component/Header';
import styled from 'styled-components';
import {Grid, Text, Input, Button} from '../element/index';
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import post, {actionCreators as postActions} from '../redux/modules/post';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import CreateModal from '../component/CreateModal';

function Main(){
    const dispatch = useDispatch();
    const RoomList = useSelector(state => state.post.rooms);
    const socket = useSelector(state => state.post.data)
    const currentId = localStorage.getItem('userId')
    const history = useHistory();
    // const socket = io.connect('http://3.39.193.90');
    const [getModal, setModal] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const entrance = (socketId) => {
        history.push(`/gameroom/${socketId}`)
        dispatch(postActions.sendSocket(socket, socketId))
        socket.emit('joinRoom', socketId)
    }
    
    useEffect(() => {
        socket.emit('main', currentId)
        socket.emit('roomList')
        socket.on('roomList', rooms => {
            dispatch(postActions.sendRoomList(rooms))
        })

        let unlisten = history.listen((location) => {
            if(history.action === 'PUSH'){
                console.log('push')
            }
            if(history.action === 'POP'){
                console.log('POP')
            }
        });
        return () => {
            unlisten();
        }
    },[]);
    
    return(
        <>
        <Header/>
        { getModal == true ? <CreateModal socket={socket} getModal={getModal} setModal={setModal} /> : null }
        <Grid width='100vw' height='25vh' padding='50px'>
            <Grid is_flex padding='0px 20px 0px 20px'>
                <Explain></Explain>
                <Myinfo>
                    <Text margin='-0%' size='20px' bold>나의 정보</Text>
                    <Grid is_flex height='10vh'>
                        <ProfileImg border width='75px' height='75px' bg='pink'></ProfileImg>
                        <Grid padding='0 20px 0 20px'>
                            <Text size='20px' bold>이범규</Text>
                            <Text size='20px' bold>0승 25패</Text>
                        </Grid>
                    </Grid>
                </Myinfo>
            </Grid>
        </Grid>
        <Grid width='100vw' height='60vh' padding='20px 100px 0 40px'>
            <Grid is_flex height='10%' padding='10px'>
                <Text size='25px' bold>전체 방 목록</Text>
                <Button _onClick={()=>{setModal(!getModal)}} bg='#d2d2d2' padding='10px' size='15px'>방 만들기</Button>
            </Grid>
            <RoomBox>
                {RoomList.map((element) => {
                    return(
                        <Room onClick={() => {entrance(element.socketId)}}>
                            <Button width='30%' size='20px' padding='10px' bg='#ffb72b' margin='0 0% 0 35%'>입장</Button>
                        </Room>
                    )
                })}
            </RoomBox>
        </Grid>
        </>
    )
}
const RoomBox = styled.div`
    width:100%;
    height:60%;
    padding:30px 50px 30px 10px;
    overflow:scroll;
    display:flex;
    flex-direction : rows;
    @media screen and (max-width: 600px) {
        height:100%;
        flex-direction : column;
    }
`
const Explain = styled.div`
    border:2px solid #ffb72b;
    border-radius:10px;
    width:80%;
    height:100%;
    @media screen and (max-width: 900px) {
        display:none;
    }
`
const Myinfo = styled.div`
    width:400px;
    height:80%;
    padding:20px;
    margin-left:10px;
    border:2px solid #ffb72b;
    border-radius:10px;
    @media screen and (max-width: 900px) {
        width:100%;
    }
`
const ProfileImg = styled.div`
    min-width:75px;
    height:75px;
    border-radius:50%;
    background:pink;
`
const Room = styled.div`
    width:300px;
    min-width:300px;
    height:100%;
    background:#white;
    box-shadow: 2px 2px 2px 2px #d2d2d2;
    border-radius:20px;
    margin-right : 20px;
    @media screen and (max-width: 600px) {
        min-height:200px;
        margin-bottom:20px;
    }
`
export default Main