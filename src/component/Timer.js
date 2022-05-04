import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as roomAction } from '../redux/modules/rooms'

function Timer(props) {
  // const setNight = props.setNight
  // const getNight = props.getNight
  const socket = useSelector((state) => state.post.data)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [getNight, setNight] = useState(false)

  const dispatch = useDispatch()

  const dayAndNight = () => {
    console.log(getNight)
    // 낮과 밤을 구분할 때 호출되는 함수
    if (getNight === false) {
      setNight(!getNight)
      console.log(getNight)
      socket.emit('timer', 30)
      console.log('밤이 되었습니다')
      socket.emit('nightVoteResult')
    } else {
      setNight(!getNight)
      console.log(getNight)
      socket.emit('timer', 30)
      console.log('아침이 되었습니다')
      socket.emit('dayVoteResult')
    }
  }

  useEffect(() => {
    console.log(getNight)
    console.log('으악')
    socket.on('timer', (time) => {
      // 서버에서 오는 타이머 카운트 받음
      setMinutes(time.min)
      setSeconds(time.sec)
      if (time.min == 0 && time.sec == 0) {
        dayAndNight()
        return dispatch(roomAction.changeDay(getNight))
      }
    })
  }, [socket])
  return (
    <>
      <div>
        {minutes} : {seconds}
        <button onClick={dayAndNight} />
      </div>
    </>
  )
}
export default Timer
