import styled from "styled-components"

function Chatdiv(props){
    const currentId = props.currentId;
    const element = props.e;
    console.log(element.data);
    
    const Line = styled.div`
    height:30px;
    background:white;
    margin-top: 10px;
    text-align:${element.data.id == currentId ? 'right' : 'left'};
`
    return(
        <>
        <Line>{element.data.msg}</Line>
        </>
    )
}

export default Chatdiv