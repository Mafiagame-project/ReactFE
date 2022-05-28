import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import styled from 'styled-components'
import { Grid, Text, Input } from '../../element/index'
import FriendList from '../FriendList'
import ModalPortal from './ModalPortal'
import closeIcon from '../../assets/icons/black/닫기.png'
import pattern01 from '../../assets/image/pattern/01_opacity.png'
import noFriend from '../../assets/image/noti/no_friend.png'
import { clickSF, deniedSF } from '../../element/Sound'

const FriendlistModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const [addFriend, setAddFriend] = React.useState('')
  const friendList = useSelector((state) => state?.user?.friendList)
  const userId = localStorage.getItem('userId')

  React.useEffect(() => {
    dispatch(userActions.getFriendDB())
  }, [])

  const onChangeFriend = (e) => {
    setAddFriend(e.target.value)
  }

  const addFriendBtn = () => {
    if (addFriend === '') {
      deniedSF.play()
      alert('친구 아이디를 적어주세요!')
      return
    }

    if (userId === addFriend) {
      deniedSF.play()
      alert('본인 말고 다른 친구를 사귀어 보아요!')
      return
    } else {
      clickSF.play()
      dispatch(userActions.addFriendDB(addFriend))
      setAddFriend('')
    }
  }

  return (
    <>
      <ModalPortal>
        <Background
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <Content onClick={(e) => e.stopPropagation()}>
            <Grid bg="#fff" center flex_column>
              <Grid>
                <img
                  src={closeIcon}
                  alt="닫기"
                  onClick={() => onClose()}
                  style={{ float: 'right' }}
                />
              </Grid>
              <Text size="20px">내 친구 리스트</Text>
              <Grid>
                <Input
                  placeholder="아이디/이메일을 입력하세요"
                  type="text"
                  width="80%"
                  margin="4vh"
                  padding="1vh"
                  value={addFriend}
                  _onChange={onChangeFriend}
                  _onKeyDown={addFriendBtn}
                />
              </Grid>
            </Grid>
            <Grid>
              {friendList?.length > 0 ? (
                friendList.map((e, i) => {
                  return <FriendList key={i} userId={e.userId} />
                })
              ) : (
                <TextBox>
                  <img src={noFriend} alt="친구없음" />
                </TextBox>
              )}
            </Grid>
          </Content>
        </Background>
      </ModalPortal>
    </>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;

  height: 610px;
  max-width: 410px;
  width: 100%;
  background-image: url(${pattern01});
  background-color: #aaa;
  position: relative;
  overflow: scroll;
`

const TextBox = styled.div`
  text-align: center;
  padding: 4vw;
  color: #fff;
`

export default FriendlistModal
