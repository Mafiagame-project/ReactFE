import React from 'react'
import { history } from '../redux/configureStore'
import { useSelector } from 'react-redux'
import { Grid, Text, DotButton } from '../element/index'
import Header from '../component/Header'
import Rooms from '../component/Rooms'
import TutorialBanner from '../component/TutorialBanner'
import ModalPortal from '../component/modal/ModalPortal'
import CreateRoomModal from '../component/modal/CreateRoomModal'
import styled from 'styled-components'

function Main(props) {
  const socket = useSelector((state) => state.game.socket)
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <Header />

      <Container>
        <TutorialBanner />
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
      <ModalPortal>
        {isOpen && (
          <CreateRoomModal socket={socket} onClose={() => setIsOpen(false)} />
        )}
      </ModalPortal>
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
