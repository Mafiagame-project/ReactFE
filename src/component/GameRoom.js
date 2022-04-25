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
    width:20vw;
    min-width:15vw;
    height:100%;
    background:#white;
    box-shadow: 2px 2px 2px 2px #d2d2d2;
    border-radius:20px;
    margin-right : 20px;
`
export default GameRoom