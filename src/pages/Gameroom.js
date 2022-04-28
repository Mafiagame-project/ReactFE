import styled from "styled-components"
import Chatdiv from'../component/Chatdiv';
import {Grid, Button} from '../element/index'
import Timer from "../component/Timer";
import { useEffect, useRef, useState } from "react";
import {actionCreators as postActions} from '../redux/modules/post';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function GameRoom(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const socket = useSelector(state => state.post.data);
    const currentMember = useSelector(state => state.post.member);
    const currentId = localStorage.getItem('userId');
    const [getNotice, setNotice] = useState(false);
    const [getWho, setWho] = useState();
    const [getWrite, setWrite] = useState([]);
    const [getTime, setTime] = useState(false);
    const text = useRef();
    const send = () => {
        let chatData = text.current.value;
        socket.emit('msg', chatData);
    }
    const exitRoom = () => {
        history.replace('/gamemain');
        socket.emit('leaveRoom');
        dispatch(postActions.exceptExit(currentId))
        
    }
    const whenExit = () => {
        socket.on('leaveRoomMsg', whosout => {
            setWho(whosout.msg)
            setNotice(true);
            setTimeout(()=>{ setNotice(false) }, 2000);
        })
    }
    console.log(currentMember);
    const Noti = styled.div`
    width:200px;
    height:50px;
    padding:15px;
    background:rgba(0,0,0,0.3);
    z-index:5;
    display:${getNotice == true ? 'block' : 'none'}
`
    useEffect(()=>{
        socket.on('msg', data => {
            setWrite(list => [...list, {data}]);
        });
        socket.on('joinRoomMsg', (whosenter) => {
            setWho(whosenter.msg)
            let someone = whosenter.msg
            dispatch(postActions.currentMember(currentId))
            setNotice(true);
            setTimeout(() => {setNotice(false)},2000)
        })
        whenExit();

        let unlisten = history.listen((location) => {
            if(history.action === 'POP'){
                socket.emit('leaveRoom')
                whenExit();
            }
        });
        return () => {
            unlisten();
        }
    },[socket])

    return(
        <Grid is_flex width='100vw' height='100vh'>
            <Grid width='75vw' bg='pink'>
            <Noti>{getWho}</Noti>
            </Grid>
            <Grid width='500px' padding='5% 10px 5% 10px'>
                {
                    getTime == true
                    ? <Timer></Timer>
                    : null
                }
                <button onClick={()=>{setTime(true)}}>true</button>
                <button onClick={()=>{setTime(false)}}>false</button>
                <Grid height='30px'>
                    <Button _onClick={()=>{exitRoom()}}>방 나가기</Button>
                </Grid>
                <Chatbox>
                    <Grid width='100%' height='10%'></Grid>
                    <Grid overflow='scroll' padding='10px 0 0 10px' height='75%' bg='#ACF3FF'>
                        { getWrite.map((e) => {
                            return(
                            <Chatdiv currentId={currentId} e={e}/>
                            )
                        })}
                    </Grid>
                    <Grid padding='5%' height='15%'>
                        <input ref={text} style={{borderRadius:'10px', padding:'10px',border:'none', width:'75%', fontSize:'21px'}}/>
                        <Button margin='0 0 0 5px' width='15%' padding='10px' bg='#FFD5A6' _onClick={()=>{send()}}>보내기</Button>
                    </Grid>
                </Chatbox>
            </Grid>
        </Grid>
    )
}

const Chatbox = styled.div`
  width: 100%;
  height: 80vh;
  background: #eee;
  border-radius: 5%;
  box-shadow: 1px 1px 1px 1px gray;
`



export default GameRoom
