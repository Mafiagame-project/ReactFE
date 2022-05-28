import React from 'react'
import { Grid, Text, Image } from '../element/index'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import styled from 'styled-components'
import deleteIcon from '../assets/icons/white/쓰레기통.png'
import { deniedSF } from '../element/Sound'

const FriendList = (props) => {
  const dispatch = useDispatch()
  const [openBtn, setOpenBtn] = React.useState(false)
  const showBtn = () => {
    setOpenBtn(!openBtn)
  }

  const deleteBtn = () => {
    deniedSF.play()
    if (
      window.confirm(`${props.userId}님을 친구에서 정말 삭제하시겠어요?`) ===
      true
    ) {
      dispatch(userActions.deleteFriendDB(props.userId))
    } else {
      return null
    }
  }

  return (
    <>
      <Container onClick={showBtn}>
        <Grid is_flex margin="20px">
          <Image size="80" />
          <Grid>
            <Text margin="0px 20px">{props.userId}</Text>
          </Grid>
        </Grid>
        {openBtn ? (
          <DeleteBtn onClick={deleteBtn}>
            <img src={deleteIcon} alt="delete" />
          </DeleteBtn>
        ) : null}
      </Container>
    </>
  )
}
const Container = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  margin: 10px 20px;
`

const DeleteBtn = styled.div`
  cursor: pointer;
  text-align: center;
  height: 120px;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #000;
`

export default FriendList
