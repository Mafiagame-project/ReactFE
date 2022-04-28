import { useHistory } from 'react-router-dom';
import {Grid, Text, Button} from '../element/index';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {actionCreators as postActions} from '../redux/modules/post';


function Loading(){
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token')
    
    const entrance = () => {
        history.push('/gamemain');
        const socket = io.connect('https://sparta-dongsun.shop');
        dispatch(postActions.sendSocket(socket))
    }
    
    return(
        <>
        <Grid width='100vw' height='100vh' bg='#eee'>
            <Grid is_flex flex>
                {
                    token
                    ? <Text _onClick={()=>{entrance()}} bold size='32px'>게임시작</Text>
                    : <Grid is_flex flex>
                        <Text _onClick={()=>{history.push('/login')}} bold size='32px'>로그인</Text>
                        <Text _onClick={()=>{history.push('/signup')}} bold size='32px'>회원가입</Text>
                    </Grid>
                }
            </Grid>
        </Grid>
        </>
    )
}
export default Loading