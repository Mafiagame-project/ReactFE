import React from 'react'
import { DotButton } from '../../element/index'
import VoteModal from '../modal/VoteModal'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const VoteBtn = () => {
  const [voteOpen, setVoteOpen] = React.useState(false)
  let killed = useSelector((state) => state.game.killed)
  const currentNick = localStorage.getItem('userNick')

  const toggleOpen = () => {
    if (killed == null) {
      killed = []
    }
    if (killed?.includes(currentNick)) {
      setVoteOpen(false)
      toast.warning('당신은 죽었기때문에 선택할 수 없습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-dup',
        autoClose: 2500,
      })
    } else {
      setVoteOpen(true)
    }
  }

  return (
    <>
      {/* 첫번째 낮일 때 투표 막기.... */}
      <DotButton white01 text="투표하기" _onClick={toggleOpen} />
      {voteOpen && <VoteModal onClose={() => setVoteOpen(false)} />}
    </>
  )
}

export default VoteBtn
