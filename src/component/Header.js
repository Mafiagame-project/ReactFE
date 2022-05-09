import React from 'react'
import styled from 'styled-components'
import { Grid, Text, Image } from '../element/index'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreators as userActions } from '../redux/modules/user'
import Friendlist from '../component/Friendlist'
import FriendsListModal from './modal/FriendsListModal'
import ModalPortal from './modal/ModalPortal'
import dao from '../assets/image/Dao.png'

function Header(props) {
  const dispatch = useDispatch()
  const currentId = localStorage.getItem('userId')
  const [getFriend, setFriend] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const handleLogOut = () => {
    dispatch(userActions.logOutDB())
  }
  return (
    <>
      <Grid is_flex bg="#000" padding="0 9vw 0 7.5vw" height="10vh">
        <Grid _onClick={() => history.push('/')}>
          <Text size="30px" color="#fff">
            MAFIYANG
          </Text>
        </Grid>
        <Rightside>
          <Grid flex_column>
            <Grid isFlex_start>
              <Image size="50" />
              <Grid margin="0 22px">
                <Text margin="0px" color="#fff">
                  {currentId}
                </Text>
                <Text margin="0px" color="#fff">
                  0승 25패
                </Text>
                <Text
                  margin="0px"
                  color="#aaa"
                  _onClick={() => history.push('/edituser')}
                >
                  수정하기
                </Text>
              </Grid>
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
      {/* 친구 목록 모달 부분입니다 */}
      <ModalPortal>
        {isOpen && (
          <FriendsListModal onClose={() => setIsOpen(false)}></FriendsListModal>
        )}
      </ModalPortal>
    </>
  )
}

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
