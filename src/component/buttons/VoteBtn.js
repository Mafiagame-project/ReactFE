import React from 'react'
import { DotButton } from '../../element/index'
import VoteModal from '../modal/VoteModal'

const VoteBtn = () => {
  const [voteOpen, setVoteOpen] = React.useState(false)

  return (
    <>
      <DotButton black02 text="투표하기" _onClick={() => setVoteOpen(true)} />
      {voteOpen && <VoteModal onClose={() => setVoteOpen(false)} />}
    </>
  )
}

export default VoteBtn
