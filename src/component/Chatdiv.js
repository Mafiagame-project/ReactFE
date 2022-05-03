import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components"

function Chatdiv(props){
    const currentId = props.currentId;
    const element = props.e;
    
    const Chatid = styled.div`
    text-align:${element.data.id == currentId ? 'right' : 'left'};
    position:relative;
    right:${element.data.id == currentId ? '2%' : '-2%'};
    color:black;
    font-size:15px;
    margin-bottom:5px;
    `
    const Chatword = styled.div`
        text-align:${element.data.id == currentId ? 'right' : 'left'};
        position:relative;
        background:white;
        border-radius:5%;
        border:1px solid black;
        padding:10px;
        display:inline-block;
        right:${element.data.id == currentId ? '2%' : '-2%'};
    `
    const OneChat = styled.div`
        width:100%;
        height:50px;
        margin-top:18px;
        text-align:${element.data.id == currentId ? 'right' : 'left'}

    `
    return(
        <>
        <OneChat>
            {
                element.data.id !== currentId
                ?<Chatid>{element.data.id}</Chatid>
                : null
            }
            <Chatword>{element.data.msg}</Chatword>
        </OneChat>
        </>
    )
}

export default Chatdiv