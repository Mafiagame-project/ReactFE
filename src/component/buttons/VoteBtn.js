import React from 'react'
import { useSelector } from 'react-redux'
import { DotButton } from '../../element/index'
import VoteModal from '../modal/VoteModal'

const VoteBtn = () => {
  const [voteOpen, setVoteOpen] = React.useState(false)
  const dayCount = useSelector((state) => state.game.cnt)

  return (
    <>
    {
      dayCount > 0
      ?<DotButton white01 text="투표하기" _onClick={() => setVoteOpen(true)} ></DotButton>
      : <DotButton white01 text="투표하기"></DotButton>
    }
      {voteOpen && <VoteModal onClose={() => setVoteOpen(false)} />}
    </>
  )
}

export default VoteBtn
