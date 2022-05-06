import React from 'react'
import styled from 'styled-components'
import { Grid, Text } from '../element/index'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreators as userActions } from '../redux/modules/user'
import Friendlist from '../component/Friendlist'
import FriendsListModal from './modal/FriendsListModal'
import ModalPortal from './modal/ModalPortal'
import dao from '../assets/image/Dao.png'

function Header() {
  const dispatch = useDispatch()
  const currentId = localStorage.getItem('userId')
  const [getFriend, setFriend] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const handleLogOut = () => {
    dispatch(userActions.logOutDB())
  }
  return (
    <>
      <Grid is_flex bg="#000" padding="0 30px" hegith="100px">
        <Grid _onClick={() => history.push('/')}>
          <Text color="#fff">로고</Text>
        </Grid>
        <Rightside>
          <Grid is_flex>
            <ProfileImg>
              <img style={{ width: '70px', height: '50px' }} src={dao} />
            </ProfileImg>
            <Grid margin="0 20px">
              <Text color="#fff">{currentId}</Text>
              <Text color="#fff">0승 25패</Text>
            </Grid>
          </Grid>
          <Grid is_flex>
            <Text color="#fff">사운드</Text>
            <Text
              color="#fff"
              _onClick={() => {
                setIsOpen(true)
              }}
            >
              친구목록
            </Text>
            <Text color="#fff" _onClick={handleLogOut}>
              로그아웃
            </Text>
          </Grid>
        </Rightside>
      </Grid>
      {/* {getFriend == true ? (
        <Friendlist getFriend={getFriend} setFriend={setFriend} />
      ) : null} */}

      {/* 친구 목록 모달 부분입니다 */}
      <ModalPortal>
        {isOpen && (
          <FriendsListModal onClose={() => setIsOpen(false)}></FriendsListModal>
        )}
      </ModalPortal>
    </>
  )
}
const ProfileImg = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Rightside = styled.div`
  width: 35vw;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`
export default Header
