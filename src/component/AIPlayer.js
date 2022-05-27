import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as memberActions } from '../redux/modules/member'

const AiPlayer = () => {
  const dispatch = useDispatch()
  const socket = useSelector((state) => state.game.socket)
  const player = useSelector((state) => state.game.ai)
  console.log(player)

  // React.useEffect(() => {
  //   socket.on('AI', (value) => {
  //     console.log(value)
  //     dispatch(gameActions.aiPlayer(value))
  //     dispatch(memberActions.aiMember(value))
  //   })
  // }, [])

  return (
    <>
      {/* {player?.map((p, i) => {
    return (  */}
      <div className="video_grid">
        <div className="ai_video"></div>
        <div className="fl">
          <p>p</p>
        </div>
      </div>
      {/* ) })}  */}
    </>
  )
}

export default AiPlayer
