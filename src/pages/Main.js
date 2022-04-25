import Header from '../component/Header';
import Grid from '../element/Grid';
import Text from '../element/Text';
import Rooms from '../component/Rooms';
import styled from 'styled-components';
import Button from '../element/Button';

function Main(){
    return(
        <>
        <Header/>
        <Grid width='100vw' height='25vh' padding='50px'>
            <Grid is_flex padding='0px 20px 0px 20px'>
                <Explain></Explain>
                <Myinfo>
                    <Text margin='-0%' size='20px' bold>나의 정보</Text>
                    <Grid is_flex height='10vh'>
                        <ProfileImg border width='75px' height='75px' bg='pink'></ProfileImg>
                        <Grid padding='0 20px 0 20px'>
                            <Text size='20px' bold>이범규</Text>
                            <Text size='20px' bold>0승 25패</Text>
                        </Grid>
                    </Grid>
                </Myinfo>
            </Grid>
        </Grid>
        <Grid width='100vw' height='60vh' padding='20px 100px 0 40px'>
            <Grid is_flex height='10%' padding='10px'>
                <Text size='25px' bold>전체 방 목록</Text>
                <Button bg='#d2d2d2' padding='10px' size='15px'>방 만들기</Button>
            </Grid>
            <RoomBox>
                {Array.from({length:9}, (e, i) => {
                    return(
                        <Rooms/>
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
    padding:30px 50px 30px 10px;
    overflow:scroll;
    display:flex;
    flex-direction : rows;
    @media screen and (max-width: 600px) {
        height:100%;
        flex-direction : column;
    }
`
const Explain = styled.div`
    border:2px solid #ffb72b;
    border-radius:10px;
    width:80%;
    height:100%;
    @media screen and (max-width: 900px) {
        display:none;
    }
`
const Myinfo = styled.div`
    width:400px;
    height:80%;
    padding:20px;
    margin-left:10px;
    border:2px solid #ffb72b;
    border-radius:10px;
    @media screen and (max-width: 900px) {
        width:100%;
    }
`
const ProfileImg = styled.div`
    min-width:75px;
    height:75px;
    border-radius:50%;
    background:pink;
    
`
export default Main