import styled from "styled-components"
import Grid from "../element/Grid";
import Input from "../element/Input";
import Button from "../element/Button";
import Chatdiv from'../component/Chatdiv';

function GameRoom(){
    return(
        <Grid is_flex width='100vw' height='100vh'>
            <Grid width='75vw' bg='pink'></Grid>
            <Grid width='500px' padding='5% 10px 5% 10px'>
                <Chatbox>
                    <Grid width='100%' height='10%'></Grid>
                    <Grid height='75%' bg='Lemonchiffon'>
                        <Chatdiv/>
                    </Grid>
                    <Grid padding='5%' height='15%'>
                        <input style={{borderRadius:'10px', padding:'10px',border:'none', width:'80%', fontSize:'21px'}}/>
                        <Button>보내기</Button>
                    </Grid>
                </Chatbox>
            </Grid>
        </Grid>
    )
}

const Chatbox = styled.div`
    width:100%;
    height:80vh;
    background:#eee;
    border-radius:5%;
    box-shadow:1px 1px 1px 1px gray;
`

export default GameRoom