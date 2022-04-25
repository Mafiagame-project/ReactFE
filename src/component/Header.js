import styled from 'styled-components';
import Grid from '../element/Grid';
import Text from '../element/Text';

function Header(){
    return(
        <Grid is_flex width='100vw' height='6vh' bg='#eee'>
            <Grid width='75vw'></Grid>
            <Rightside>
                <Text size='16px' bold margin='20px'>친구목록</Text>
                <Text size='16px' bold margin='20px'>로그아웃</Text>
            </Rightside>
        </Grid>
    )
}
const Rightside = styled.div`
    width:25vw;
    height:100%;
    display:flex;
    float:left;
`
export default Header