import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'

function Timer(props) {
  const socket = useSelector((state) => state.game.socket)
  const currentTime = useSelector((state) => state.game.night)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  try {
    socket.on('timer', (time) => {
      setMinutes(time.min)
      setSeconds(time.sec)
    })
  } catch {
    const socket = io.connect('https://sparta-dongsun.shop')
    socket.io.on('reconnect')
    socket.emit('leaveRoom')
    alert('비정상적 접근으로인해 메인으로 이동합니다')
    window.location = '/'
    socket.disconnect();
  }


  return (
    <>
      <div style={{fontSize:'52px', marginBottom:'20px', color:`${currentTime == true ? 'white' : 'black'}`}}>
        {minutes} : {seconds}
      </div>
    </>
  )
}
export default Timer
