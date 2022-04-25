import Header from '../component/Header';
import Grid from '../element/Grid';
import Text from '../element/Text';
import GameRoom from '../component/GameRoom';
import styled from 'styled-components';

function Main(){
    return(
        <>
        <Header/>
        <Grid width='100vw' height='34vh' padding='50px'>
            <Grid is_flex padding='0px 30px 0px 30px'>
                <Grid border='1px solid' width='80%'></Grid>
                <Grid padding='20px' margin='0 0 0 30px' border='1px solid' width='400px'>
                    <Text>나의 정보</Text>
                    <Grid is_flex height='10vh'>
                        <ProfileImg border width='75px' height='75px' bg='pink'></ProfileImg>
                        <Grid padding='0 20px 0 20px'>
                            <Text size='20px' bold>이범규</Text>
                            <Text size='20px' bold>0승 25패</Text>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid width='100vw' height='60vh' padding='20px 100px 0 40px'>
            <Grid height='10%' padding='10px'>
                <Text size='25px' bold>전체 방 목록</Text>
            </Grid>
            <RoomBox>
                {Array.from({length:9}, (e, i) => {
                    return(
                        <GameRoom/>
                    )
                })}
            </RoomBox>
        </Grid>
        </>
    )
}
const RoomBox = styled.div`
    width:100%;
    height:60%;
    padding:30px 40px 30px 40px;
    overflow:scroll;
    display:flex;
    flex-direction : rows;
`
const ProfileImg = styled.div`
    min-width:75px;
    height:75px;
    border-radius:50%;
    background:pink;
`
export default Main