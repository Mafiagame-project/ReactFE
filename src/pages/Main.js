import React from 'react'
import { history } from '../redux/configureStore'
import { useSelector } from 'react-redux'
import { Grid, Text, DotButton } from '../element/index'
import Header from '../component/Header'
import Rooms from '../component/Rooms'
import ModalPortal from '../component/modal/ModalPortal'
import CreateRoomModal from '../component/modal/CreateRoomModal'
import styled from 'styled-components'

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
        <Rooms />
        <Grid isFlex_center>
          <DotButton
            black02
            text="방 만들기"
            _onClick={() => {
              setIsOpen(true)
            }}
          />
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default Main
