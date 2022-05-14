import React from 'react'
import { history } from '../redux/configureStore'
import { useSelector } from 'react-redux'
import { Grid, Text, DotButton } from '../element/index'
import { useDispatch } from 'react-redux'
import { actionCreators as roomActions } from '../redux/modules/room'
import Header from '../component/Header'
import Rooms from '../component/Rooms'
import TutorialBanner from '../component/TutorialBanner'
import CreateRoomModal from '../component/modal/CreateRoomModal'
import styled from 'styled-components'

function Main(props) {
  const socket = useSelector((state) => state.game.socket)
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    socket.on('roomList', (rooms) => {
      dispatch(roomActions.sendRoomList(rooms))
    })
  }, [socket])

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
      {isOpen && (
        <CreateRoomModal socket={socket} onClose={() => setIsOpen(false)} />
      )}
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
