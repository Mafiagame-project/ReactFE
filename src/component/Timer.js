import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { useDispatch, useSelector } from 'react-redux'

function Timer(props) {
  const socket = useSelector((state) => state.game.socket)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  try {
    socket.on('timer', (time) => {
      setMinutes(time.min)
      setSeconds(time.sec)
    })
  } catch {
    alert('비정상적 접근으로인해 메인으로 이동합니다')
    window.location = '/'
  }


  return (
    <>
      <div style={{fontSize:'32px', marginBottom:'20px'}}>
        {minutes} : {seconds}
      </div>
    </>
  )
}
export default Timer
