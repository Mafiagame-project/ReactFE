import React from 'react'
import styled from 'styled-components'
import { Grid, Text, Image } from '../element/index'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreators as userActions } from '../redux/modules/user'
import FriendsListModal from './modal/FriendsListModal'
import ModalPortal from './modal/ModalPortal'
import friendIcon from '../assets/icons/white/친구(백).png'
import soundIcon from '../assets/icons/white/소리(백).png'
import LogoutIcon from '../assets/icons/white/로그아웃(백).png'

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
      <Container>
        <Grid _onClick={() => history.push('/')}>
          <Text size="30px" color="#fff">
            MAFIYANG
          </Text>
        </Grid>
        <Rightside>
          <Grid flex_column>
            <Grid isFlex_start>
              <Image size="50" />
              <Grid margin="0 22px" className="headerText">
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
            <Grid center margin="0 10px">
              <Icons src={soundIcon} />
              <Text margin="0" color="#fff" size="12px" color="#fff">
                sound
              </Text>
            </Grid>
            <Grid
              center
              margin="0 10px"
              _onClick={() => {
                setIsOpen(true)
              }}
            >
              <Icons src={friendIcon} />
              <Text margin="0" color="#fff" size="12px">
                Friends
              </Text>
            </Grid>
            <Grid center margin="0 10px" _onClick={handleLogOut}>
              <Icons src={LogoutIcon} />
              <Text margin="0" color="#fff" size="12px">
                LogOut
              </Text>
            </Grid>
          </Grid>
        </Rightside>
      </Container>
      {/* 친구 목록 모달 부분입니다 */}
      <ModalPortal>
        {isOpen && (
          <FriendsListModal onClose={() => setIsOpen(false)}></FriendsListModal>
        )}
      </ModalPortal>
    </>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  padding: 0 8vw;
  height: 10vh;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 3vw;
  }

  @media ${({ theme }) => theme.device.tablet} {
    padding: 0 5.5vw;
  }
  @media @media ${({ theme }) => theme.device.pc} { {
    padding: 0 6vw;
  }
`

const Icons = styled.img`
  width: 30px;
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
