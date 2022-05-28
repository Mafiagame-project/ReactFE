import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VoteModal from '../modal/VoteModal'
import { DotButton } from '../../element/index'
import { clickSF, deniedSF } from '../../element/Sound'

const VoteBtn = () => {
  const [voteOpen, setVoteOpen] = React.useState(false)
  let killed = useSelector((state) => state.game.killed)
  const dayCount = useSelector((state) => state.game.cnt)
  const currentNick = localStorage.getItem('userNick')

  const toggleOpen = () => {
    if (killed == null) {
      killed = []
    }
    if (killed?.includes(currentNick)) {
      deniedSF.play()
      setVoteOpen(false)
      toast.warning('당신은 죽었기때문에 선택할 수 없습니다', {
        position: toast.POSITION.TOP_LEFT,
        className: 'toast-dup',
        autoClose: 2500,
      })
    } else {
      clickSF.play()
      setVoteOpen(true)
    }
  }

  return (
    <>
      {dayCount > 0 ? (
        <DotButton white01 text="투표하기" _onClick={toggleOpen}></DotButton>
      ) : null}
      {voteOpen && <VoteModal onClose={() => setVoteOpen(false)} />}
    </>
  )
}

export default VoteBtn
