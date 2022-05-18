import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Button, DotButton, Text } from '../../element/index'

function ReadyBtn() {
  const socket = useSelector((state) => state.game.socket)
  const [getReady, setReady] = useState(false)

  const readyGame = () => {
    if (getReady == false) {
      socket.emit('ready', true)
      socket.off('ready')
    } else {
      socket.emit('ready', false)
      socket.off('ready')
    }
    setReady(!getReady)
  }

  return (
    <>
      {getReady == false ? (
        <DotButton
          white02
          text="준비하기"
          _onClick={() => {
            readyGame()
          }}
        />
      ) : (
        <DotButton
          black02
          text="준비완료"
          _onClick={() => {
            readyGame()
          }}
        />
      )}
    </>
  )
}
export default ReadyBtn
