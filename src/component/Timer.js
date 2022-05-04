import { useEffect, useState } from 'react'
import { actionCreators as postActions } from '../redux/modules/post'
import { useDispatch, useSelector } from 'react-redux'

function Timer(props) {
  const dispatch = useDispatch()
  const [check, setCheck] = useState()
  const setNight = props.setNight
  const getNight = props.getNight
  const socket = useSelector((state) => state.post.data)
  const is_night = useSelector((state) => state.post.isNight)
  const time = useSelector((state) => state.post.second)
  const roomHost = useSelector((state) => state.room.host)
  const currentId = localStorage.getItem('userId')
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const dayAndNight = () => {
    console.log(is_night) // 계속 false
    // 낮과 밤을 구분할 때 호출되는 함수
    if (is_night == false) {
      // 밤이 아니다
      if (roomHost == currentId) {
        socket.emit('timer', 5)
      }
      console.log('밤이 되었습니다')
      socket.emit('dayVoteResult')
    } else {
      if (roomHost === currentId) {
        socket.emit('timer', 5)
      }
      console.log('아침이 되었습니다')
      socket.emit('nightVoteResult')
    }
  }

  // cosnt dayTime = () => {
  //   socket.on('isNight', value => {
  //     if (value){
  //       socket.emit('nightVoteResult')
  //     } else {
  //       socket.emit('dayVoteResult')
  //     }
  //   })
  // }

  // const voteResult = () => {
  //   socket.on('nightVoteResult', value)
  //   socket.on('dayVoteResult', value)
  // }
  socket.on('timer', (time) => {
    // dispatch(postActions.sendTime(time.sec))
    // setMinutes(time.min)
    // setSeconds(time.sec)
    // if(time.sec == 0){
    //   dayAndNight();
    // }
  })

  return (
    <>
      <div> {time}</div>
    </>
  )
}
export default Timer
