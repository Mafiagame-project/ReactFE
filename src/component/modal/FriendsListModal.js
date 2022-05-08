import React from 'react'
import ModalPortal from './ModalPortal'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import { Grid, Text, Button, Input, Image } from '../../element/index'
import styled from 'styled-components'

const FriendlistModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const [addFriend, setAddFriend] = React.useState('')
  const userId = localStorage.getItem('userId')

  React.useEffect(() => {
    dispatch(userActions.getFriendDB())
  }, [])

  const addFriendBtn = {
    if(userId = addFriend) {
      window.alert('나는 좋은 친구이지만...')
      setAddFriend('')
      return
    },
    // dispatch(userActions.addFriendDB(friendUserId))
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
            <Grid bg="#fff" padding="20px">
              <Text margin="0px" _onClick={() => onClose()}>
                X
              </Text>
              <Input
                placeholder="아이디/이메일을 입력하세요"
                type="text"
                _onChange={addFriend}
                _onKeyDown={addFriendBtn}
              />
            </Grid>
            <FriendList>
              <Image size="40" />
              <Grid>
                <Text>이름</Text>
                <Text>99승 99패</Text>
              </Grid>
            </FriendList>
          </Content>
        </Background>
      </ModalPortal>
    </>
  )
}

const FriendList = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  margin: 10px 20px;
`
const Img = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 70%;
  background-color: #aaa;
  float: left;
`

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
  background-color: #eee;
  position: relative;
  overflow: scroll;
`

export default FriendlistModal
