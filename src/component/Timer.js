import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

function Timer() {
  const socket = useSelector((state) => state.game.socket)
  const currentTime = useSelector((state) => state.game.night)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // 서버에서 받아오는 타이머를 스테이트에 담아서 변경해줍니다
  useEffect(() => {
    socket.on('timer', (time) => {
      setMinutes(time.min)
      setSeconds(time.sec)
    })
  }, [])

  return (
    <>
      <div
        style={{
          fontSize: '2.5vw',
          marginBottom: '1vw',
          color: `${currentTime === true ? 'white' : 'black'}`,
        }}
      >
        {minutes} : {seconds}
      </div>
    </>
  )
}
export default Timer
