import { useRef, useState } from "react";
import styled from "styled-components";
import {Grid, Text, Input, Button} from '../element/index';

function CreateModal(props){
    const getModal = props.getModal;
    const setModal = props.setModal;
    const socket = props.socket;
    const [getOpen, setOpen] = useState();
    const title = useRef();
    const people = useRef();
    const pwd = useRef();

    const Btn1 = styled.button`
        width:100px;
        background:${getOpen == true ? 'pink' : '#d2d2d2'}
    `
    const Btn2 = styled.button`
        width:100px;
        background:${getOpen == false ? 'pink' : '#d2d2d2'}
    `
    
    const createRoom = () => {
        let roomTitle = title.current.value;
        let roomPeople = people.current.value;
        let roomPwd;
        if(getOpen == false){
            roomPwd = pwd.current.value;
        }
        console.log(roomTitle, roomPeople, roomPwd, getOpen)
    }
    return(
        <Modalblack>
            <Modalwhite>
                <Grid height='10px'>
                    <Button width='50px' _onClick={()=>{setModal(!getModal)}}>X</Button>
                </Grid>
                <Grid height='150px' bg='#eee'>
                    <Text>방 만들기</Text>
                </Grid>
                <Grid is_flex width='40%' height='70px'>
                    <Text>방 제목</Text>
                    <input ref={title} style={{width:'80%'}}/>
                </Grid>
                <Grid is_flex width='40%' height='70px'>
                    <Text>인원 수</Text>
                    <input ref={people} style={{width:'80%'}}/>
                </Grid>
                <Grid is_flex width='50%' height='100px'>
                    <Btn1 onClick={()=>{setOpen(true)}}>공개</Btn1>
                    <Btn2 onClick={()=>{setOpen(false)}}>비공개</Btn2>
                    {
                        getOpen == false
                        ? <input ref={pwd} style={{marginLeft:'100px'}} placeholder="방 비밀번호 입력"/>
                        : null
                    }
                </Grid>
                <Grid>
                    <Button _onClick={()=>{createRoom()}}>생성하기</Button>
                </Grid>
            </Modalwhite>
        </Modalblack>
    )
}
const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 5;
`;
const Modalwhite = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 50%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  border-radius:20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
`;
export default CreateModal