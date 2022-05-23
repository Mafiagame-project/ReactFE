import { useState } from 'react'
import { useSelector } from 'react-redux'
import { DotButton } from '../../element/index'
import pop02 from '../../assets/sound/effect/pop02.mp3'

function ReadyBtn() {
  const socket = useSelector((state) => state.game.socket)
  const [getReady, setReady] = useState(false)
  const click = new Audio(pop02)

  const readyGame = () => {
    if (getReady === false) {
      click.play()
      socket.emit('ready', true)
      socket.off('ready')
    } else {
      click.play()
      socket.emit('ready', false)
      socket.off('ready')
    }
    setReady(!getReady)
  }

  return (
    <>
      {getReady === false ? (
        <DotButton
          white01
          text="준비하기"
          _onClick={() => {
            readyGame()
          }}
        />
      ) : (
        <DotButton
          black01
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
