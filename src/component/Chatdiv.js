import styled from "styled-components"

function Chatdiv(props){
    const element = props.e;
    console.log(element.data)
    const Line = styled.div`
    width:100%;
    height:30px;
    background:white;
    margin-top: 10px;
    text-align:${element.data.id == 'id' ? 'right' : 'left'};
`
    return(
        <>
        <Line>{element.data.msg}</Line>
        </>
    )
}

export default Chatdiv