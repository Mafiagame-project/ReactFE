import React from 'react'
import styled from 'styled-components'
import { Grid, Text, Image } from '../element/index'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreators as userActions } from '../redux/modules/user'
import { actionCreators as memberActions } from '../redux/modules/member'
import FriendsListModal from './modal/FriendsListModal'
import friendIcon from '../assets/icons/white/친구(백).png'
import soundIcon from '../assets/icons/white/소리(백).png'
import LogoutIcon from '../assets/icons/white/로그아웃(백).png'
import 마피양 from '../assets/image/character/profile.jpg'
import 기자 from '../assets/image/character/양_기자.png'
import 경찰 from '../assets/image/character/경찰.png'
import 의사 from '../assets/image/character/의사_양.png'
import pop from '../assets/sound/effect/pop02.mp3'
import denied from '../assets/sound/effect/denied02.mp3'
import logo from '../assets/logo/메인페이지.png'

function Header(props) {
  const socket = useSelector((state) => state.game.socket)
  const profileIdx = useSelector((state) => state.member.idx)
  const recordWin = useSelector((state) => state.member.win)
  const recordLose = useSelector((state) => state.member.lose)
  const changeNick = useSelector((state) => state.member.nickName)
  const pictures = [마피양, 기자, 경찰, 의사]
  const dispatch = useDispatch()
  const userNick = localStorage.getItem('userNick')
  const [isOpen, setIsOpen] = React.useState(false)
  const [soundOn, setSoundOn] = React.useState(false)
  let location = window.location.href
  const where = location.includes('gameroom')
  const click = new Audio(pop)
  const alertBgm = new Audio(denied)

  const handleLogOut = () => {
    click.play()
    dispatch(userActions.logOutDB())
  }

  React.useEffect(() => {
    dispatch(memberActions.callPlayerRecord())
    dispatch(memberActions.callUserProfile())
  }, [])

  return (
    <>
      <Container>
        <Grid
          _cursor
          _onClick={() => {
            history.push('/')
            socket.disconnect()
          }}
        >
          <img src={logo} alt="로고" />
        </Grid>
        <Rightside>
          <Grid flex_column>
            <Grid isFlex_start>
              <Image size={50} src={pictures[profileIdx]} />
              <Grid margin="0 22px" className="headerText" width="100px">
                {changeNick == null ? (
                  <Text margin="0px" color="#fff">
                    {userNick}
                  </Text>
                ) : (
                  <Text margin="0px" color="#fff">
                    {changeNick}
                  </Text>
                )}
                <Text margin="0px" color="#fff">
                  {recordWin}승 {recordLose}패
                </Text>
                {where === true ? (
                  <Text
                    _cursor
                    margin="0px"
                    color="#aaa"
                    _onClick={() => {
                      alert('현재 위치에서는 불가능합니다')
                      alertBgm.play()
                    }}
                  >
                    수정하기
                  </Text>
                ) : (
                  <Text
                    _cursor
                    margin="0px"
                    color="#aaa"
                    _onClick={() => {
                      history.push('/edituser')
                      click.play()
                    }}
                  >
                    수정하기
                  </Text>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid is_flex>
            <Grid center margin="0 10px" _cursor>
              <Icons src={soundIcon} />
              <Text margin="0" color="#fff" size="12px">
                sound
              </Text>
            </Grid>
            <Grid
              _cursor
              center
              margin="0 10px"
              _onClick={() => {
                {
                  setIsOpen(true)
                  click.play()
                }
              }}
            >
              <Icons src={friendIcon} />
              <Text margin="0" color="#fff" size="12px">
                Friends
              </Text>
            </Grid>
            {where === true ? (
              <Grid
                _cursor
                center
                margin="0 10px"
                _onClick={() => {
                  alert('현재 위치에서는 불가능합니다')
                  alertBgm.play()
                }}
              >
                <Icons src={LogoutIcon} />
                <Text margin="0" color="#fff" size="12px">
                  LogOut
                </Text>
              </Grid>
            ) : (
              <Grid _cursor center margin="0 10px" _onClick={handleLogOut}>
                <Icons src={LogoutIcon} />
                <Text margin="0" color="#fff" size="12px">
                  LogOut
                </Text>
              </Grid>
            )}
          </Grid>
        </Rightside>
      </Container>
      {isOpen && (
        <FriendsListModal onClose={() => setIsOpen(false)}></FriendsListModal>
      )}
    </>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  padding: 0 8vw;
  height: 9vh;

  @media ${({ theme }) => theme.device.mobile} {
    padding: 0 3vw;
  }

  @media ${({ theme }) => theme.device.tablet} {
    padding: 0 5.5vw;
  }
  @media @media ${({ theme }) => theme.device.pc} { {
    padding: 0 6vw;
    height: 9vh;
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
