import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Text, DotButton } from '../element/index'
import { useDispatch } from 'react-redux'
import { actionCreators as roomActions } from '../redux/modules/room'
import Header from '../component/Header'
import Rooms from '../component/Rooms'
import TutorialBanner from '../component/TutorialBanner'
import CreateRoomModal from '../component/modal/CreateRoomModal'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

function Main(props) {
  const history = useHistory();
  let socket = useSelector((state) => state.game.socket)
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    try {
      socket.on('roomList', (rooms) => {
        dispatch(roomActions.sendRoomList(rooms))
      })
    } catch {
      alert('비정상적 접근으로인해 메인으로 이동합니다')
      window.location = '/'
      socket.disconnect();
    }
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
