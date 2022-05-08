import React from 'react'
import { history } from '../redux/configureStore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Grid, Text, Button } from '../element/index'
import Header from '../component/Header'
import Rooms from '../component/Rooms'
import ModalPortal from '../component/modal/ModalPortal'
import CreateRoomModal from '../component/modal/CreateRoomModal'
// import CreateModal from '../component/CreateModal'
//이름 헷갈려서 수정했습니닷

function Main(props) {
  const socket = useSelector((state) => state.game.socket)
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <Header />
      <ModalPortal>
        {isOpen && (
          <CreateRoomModal socket={socket} onClose={() => setIsOpen(false)} />
        )}
      </ModalPortal>
      <Container>
        <Grid
          height="300px"
          bg="#eee"
          padding="30px"
          margin="20px 0 "
          _onClick={() => {
            history.push('/introduce')
          }}
        >
          <Text>마피아 게임 룰</Text>
        </Grid>
        {/* 방목록 컴포넌트로 뺐습니닷 */}
        <Rooms />

        <Grid isFlex_center>
          <Button
            _onClick={() => {
              setIsOpen(true)
            }}
            smallBtn
            hoverbg="purple"
          >
            방 만들기
          </Button>
          <Button smallBtn hoverbg="purple">
            입장하기
          </Button>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 80%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default Main
