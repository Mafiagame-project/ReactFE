import styled from 'styled-components'
import Grid from '../element/Grid'
import Text from '../element/Text'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import Friendlist from '../component/Friendlist';
import { useState } from 'react'


function Header() {
  const dispatch = useDispatch();
  const [getFriend, setFriend] = useState(false);
  const handleLogOut = () => {
    dispatch(userActions.logOutDB())
  }
  return (
    <>
    <Grid is_flex width="100vw" height="6vh" bg="#eee">
      <Grid width="75vw"></Grid>
      <Rightside>
        <Text width="100px" size="16px" bold margin="20px">
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
const Rightside = styled.div`
  width: 25vw;
  height: 100%;
  display: flex;
  float: left;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`
export default Header
