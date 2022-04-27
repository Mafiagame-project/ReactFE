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
    color:#d2d2d2;
    `
    const Chatword = styled.div`
        text-align:${element.data.id == currentId ? 'right' : 'left'};
        position:relative;
        background:white;
        border-radius:20%;
        padding:10px;
        display:inline-block;
        right:${element.data.id == currentId ? '2%' : '-2%'};
        box-shadow:1px 1px 1px 1px #eee;
    `
    const OneChat = styled.div`
        width:100%;
        height:50px;
        margin-top:12px;
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