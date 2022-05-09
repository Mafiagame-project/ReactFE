import React from 'react'
import ModalPortal from './ModalPortal'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import { Grid, Text, Button, Input, Image } from '../../element/index'
import styled from 'styled-components'

const FriendlistModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const [addFriend, setAddFriend] = React.useState('')
  const [openBtn, setOpenBtn] = React.useState(false)
  const userId = localStorage.getItem('userId')
  const friendList = useSelector((state) => state?.user?.friendList)
  console.log(friendList)

  React.useEffect(() => {
    dispatch(userActions.getFriendDB())
  }, [])

  const showBtn = () => {
    setOpenBtn(!openBtn)
  }
  const onChangeFriend = (e) => {
    setAddFriend(e.target.value)
  }

  const addFriendBtn = () => {
    dispatch(userActions.addFriendDB(addFriend))
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
                value={addFriend}
                _onChange={onChangeFriend}
                _onKeyDown={addFriendBtn}
              />
              {/* <Button _onClick={addFriendBtn}>추가</Button> */}
            </Grid>
            <Grid>
              {friendList !== null ? (
                friendList.map((e, i) => {
                  return (
                    <FriendList onClick={showBtn} key={i}>
                      <Grid is_flex margin="20px">
                        <Image size="80" />
                        <Grid>
                          <Text margin="0px 20px">{e.userId}</Text>
                        </Grid>
                      </Grid>
                      {openBtn ? (
                        <Grid isFlex_end width="40%">
                          <StarBtn>별표</StarBtn>
                          <DeleteBtn>삭제</DeleteBtn>
                        </Grid>
                      ) : null}
                    </FriendList>
                  )
                })
              ) : (
                <Text margin="20px" size="20px">
                  텅텅 🥺...아직 친구가 없어요!
                </Text>
              )}
            </Grid>
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
const StarBtn = styled.div`
  text-align: center;
  height: 110px;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #000;
`
const DeleteBtn = styled.div`
  text-align: center;
  height: 110px;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #aaa;
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
