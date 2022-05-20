import React from 'react'
import ModalPortal from './ModalPortal'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../../redux/modules/user'
import { Grid, Text, Button, Input, Image } from '../../element/index'
import styled from 'styled-components'
import closeIcon from '../../assets/icons/black/닫기.png'
import pattern01 from '../../assets/image/pattern/01.png'

const FriendlistModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const [addFriend, setAddFriend] = React.useState('')
  const [openBtn, setOpenBtn] = React.useState(false)
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

  const showBtn = () => {
    setOpenBtn(!openBtn)
  }
  const onChangeFriend = (e) => {
    setAddFriend(e.target.value)
  }

  const addFriendBtn = () => {
    dispatch(userActions.addFriendDB(addFriend))
  }

  const deleteBtn = () => {
    console.log('dd')
    dispatch(userActions.deleteFriendDB(clickedId))
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
              {/* <Button _onClick={addFriendBtn}>추가</Button> */}
            </Grid>
            <Grid>
              {friendList?.length > 0 ? (
                friendList.map((e, i) => {
                  return (
                    <FriendList onClick={showBtn} key={i}>
                      <Grid is_flex margin="20px">
                        <Image size="80" />
                        <Grid>
                          <input
                            type="radio"
                            value={e.userId}
                            onChange={clicked}
                          />
                          <Text margin="0px 20px">{e.userId}</Text>
                        </Grid>
                      </Grid>
                    </FriendList>
                  )
                })
              ) : (
                <TextBox>
                  <Text margin="20px" size="20px">
                    텅텅 🥺...
                    <br />
                    아직 친구가 없어요!
                  </Text>
                </TextBox>
              )}
              {openBtn ? (
                <Grid isFlex_end width="40%">
                  <DeleteBtn onClick={deleteBtn}>삭제</DeleteBtn>
                </Grid>
              ) : null}
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
  background-image: url(${pattern01});
  background-color: #aaa;
  position: relative;
  overflow: scroll;
`

const TextBox = styled.div`
  text-align: center;
  width: 80%;
  background-color: #fff;
  padding: 4vw;
`

export default FriendlistModal
