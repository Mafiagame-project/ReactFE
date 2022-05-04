import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

function Hello() {
  const dispatch = useDispatch()
  const history = useHistory()
  const active = () => {
    const socket = io.connect('https://sparta-dongsun.shop')
    console.log(socket)
  }
}
export default Hello
