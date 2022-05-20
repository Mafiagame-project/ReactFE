import React from 'react'
import ModalPortal from './ModalPortal'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import { Grid, Text, Button, Input, Image } from '../../element/index'
import FriendList from '../FriendList'
import styled from 'styled-components'
import closeIcon from '../../assets/icons/black/닫기.png'
import pattern01 from '../../assets/image/pattern/01.png'

const FriendlistModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const [addFriend, setAddFriend] = React.useState('')
  const [clickedId, setClickedId] = React.useState()
  const userId = localStorage.getItem('userId')
  const friendList = useSelector((state) => state?.user?.friendList)

  const clicked = (e) => {
    console.log(e.target.value)
    setClickedId(e.target.value)
  }

  React.useEffect(() => {
    dispatch(userActions.getFriendDB())
  }, [])

  const onChangeFriend = (e) => {
    setAddFriend(e.target.value)
  }

  const addFriendBtn = () => {
    dispatch(userActions.addFriendDB(addFriend))
    setAddFriend('')
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
                  onClick={() => onClose()}
                  style={{ float: 'right' }}
                />
              </Grid>
              <Text>내 친구 리스트</Text>
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
                  <Text margin="20px" size="25px" color="#fff">
                    텅텅 🥺...
                    <br />
                    아직 친구가 없어요!
                  </Text>
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
