import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function Timer(props){
  
    const setNight = props.setNight;
    const getNight = props.getNight;
    const socket = useSelector((state) => state.post.data);
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
      socket.on('timer', (time) => {
          // 서버에서 오는 타이머 카운트 받음
          setMinutes(time.min)
          setSeconds(time.sec)
          if(time.min == 0 && time.sec == 0){
            dayAndNight(getNight)
          }
        })
  },[socket])
  
    const dayAndNight = (day) => {
      console.log(day);
        // 낮과 밤을 구분할 때 호출되는 함수
        if (day == false) {
          setNight(true)
          socket.emit('timer', 60)
          console.log('밤이 되었습니다')
          socket.emit('nightVoteResult');
        } else {
          console.log(day);
          setNight(false)
          socket.emit('timer', 120)
          console.log('아침이 되었습니다');
          socket.emit('dayVoteResult');
        }
      }

    

    return(
        <>
        <div>{minutes} : {seconds}</div>
        </>
    )
}
export default Timer