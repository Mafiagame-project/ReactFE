import { useHistory } from 'react-router-dom';
import {Grid, Text, Button} from '../element/index';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import {actionCreators as postActions} from '../redux/modules/post';
import {actionCreators as roomActions} from '../redux/modules/rooms';
import { useEffect } from 'react';


function Loading(){
    const roomHost = useSelector((state) => state.room.host);
    const currentId = localStorage.getItem('userId');
    const is_night = useSelector(state => state.post.isNight);
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token');


    const entrance = () => {
        history.push('/gamemain');
        const socket = io.connect('https://sparta-dongsun.shop');
        dispatch(postActions.sendSocket(socket));

        socket.on('roomData', info => { // createModal 이벤트 발생시 실행
            socket.emit('joinRoom', info.roomId);
            dispatch(postActions.currentRoom(info));
            dispatch(roomActions.findHost(info.userId));
            history.push(`/gameroom/${info.roomId}`)
        });

        socket.on('dayVoteResult', notification => {
            console.log(notification);
            console.log(is_night)
            dispatch(postActions.notification(notification))
            dispatch(postActions.setNight());
          });
        
          socket.on('nightVoteResult', () => {
            console.log(is_night)
            dispatch(postActions.setDay())
          });
    }
    
    return(
        <>
        <Grid width='100vw' height='100vh' bg='#eee'>
            <Grid is_flex flex>
                {
                    token
                    ? <Text _onClick={()=>{entrance()}} bold size='32px'>게임시작</Text>
                    : <Grid is_flex flex>
                        <Text _onClick={()=>{history.push('/login')}} bold size='32px'>로그인</Text>
                        <Text _onClick={()=>{history.push('/signup')}} bold size='32px'>회원가입</Text>
                    </Grid>
                }
            </Grid>
        </Grid>
        </>
    )
}
export default Loading