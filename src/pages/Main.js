import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, DotButton } from '../element/index'
import { useDispatch } from 'react-redux'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as userActions } from '../redux/modules/user'
import Header from '../component/Header'
import Rooms from '../component/Rooms'
import TutorialBanner from '../component/TutorialBanner'
import CreateRoomModal from '../component/modal/CreateRoomModal'
import styled from 'styled-components'
import { clickSF } from '../element/Sound'
import Banner from '../component/SurveyBadge'

function Main(props) {
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
      socket.disconnect()
    }
  }, [socket])

  window.onbeforeunload = function () {
    return dispatch(userActions.logOutDB())
  }

  return (
    <>
      <Header />
      <Container>
        <TutorialBanner />
        <Grid is_flex>
          <Banner />
          <Rooms />
        </Grid>
        <Grid isFlex_center>
          <DotButton
            black02
            sound
            text="방 만들기"
            _onClick={() => {
              setIsOpen(true)
              clickSF.play()
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
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default Main
