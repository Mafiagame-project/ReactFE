import { useEffect, useState } from 'react'
import { actionCreators as gameActions } from '../redux/modules/game'
import { useDispatch, useSelector } from 'react-redux'

function Timer(props) {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const currentId = localStorage.getItem('userId')
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const dayAndNight = () => {
    // 낮과 밤을 구분할 때 호출되는 함수
    console.log('밤이 되었습니다')
    socket.emit('dayVoteResult')

    console.log('아침이 되었습니다')
    socket.emit('nightVoteResult')
  }

  const dayTime = () => {
    // 서버에서 낮을 받으면 나타남
    socket.on('isNight', (value) => {
      if (value == true) {
        socket.emit('nightVoteResult')
      } else {
        socket.emit('dayVoteResult')
      }
    })
  }

  const voteResult = () => {
    // 투표, 행동의 결과 출력
    socket.on('nightVoteResult')
    socket.on('dayVoteResult')
  }

  socket.on('timer', (time) => {
    // dispatch(postActions.sendTime(time.sec))
    setMinutes(time.min)
    setSeconds(time.sec)
    // if(time.sec == 0){
    //   dayAndNight();
    // }
  })

  return (
    <>
      <div>{minutes} : {seconds}</div>
    </>
  )
}
export default Timer
