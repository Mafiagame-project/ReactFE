import styled from 'styled-components'
import Grid from '../element/Grid'
import Text from '../element/Text'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import Friendlist from '../component/Friendlist';
import { useState } from 'react'
import dao from '../shared/img/Dao.png';


function Header() {
  const dispatch = useDispatch();
  const currentId = localStorage.getItem('userId')
  const [getFriend, setFriend] = useState(false);
  const handleLogOut = () => {
    dispatch(userActions.logOutDB())
  }
  return (
    <>
    <Grid is_flex width="100vw" height="7vh" bg="#d2d2d2">
      <Grid width="65vw"></Grid>
      <Rightside>
        <ProfileImg><img style={{width:'70px', height:'50px'}} src={dao}/></ProfileImg>
        <Grid margin='10px' width='30%'>
          <Text>{currentId}</Text>
          <Text>0승 25패</Text>
        </Grid>
        <Text _onClick={()=>{setFriend(!getFriend)}} width="100px" size="16px" bold margin="20px">
          친구목록
        </Text>
        <Text size="16px" bold margin="20px" _onClick={handleLogOut}>
          로그아웃
        </Text>
      </Rightside>
    </Grid>
    { getFriend == true ? <Friendlist getFriend={getFriend} setFriend={setFriend}/> : null}
      </>
  )
}
const ProfileImg = styled.div`
    min-width:50px;
    height:50px;
    border-radius:50%;
`
const Rightside = styled.div`
  width: 35vw;
  height: 100%;
  display: flex;
  float: left;
  padding-top:20px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`
export default Header
