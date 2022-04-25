import styled from "styled-components"
import Button from '../element/Button';

function GameRoom(){
    return(
        <>
        <Room>
        <Button width='30%' size='20px' padding='10px' bg='#ffb72b' margin='0 0% 0 35%'>입장</Button>

        </Room>
        </>
    )
}
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
export default GameRoom