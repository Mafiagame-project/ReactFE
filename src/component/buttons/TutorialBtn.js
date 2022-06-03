import React from 'react'
import { Grid, Text } from '../../element/index'
import TutorialModal from '../modal/TutorialModal'
import docs from '../../assets/icons/black/edit_b.png'
import docs_w from '../../assets/icons/white/edit_w.png'
import { clickSF } from '../../element/Sound'

const NewsBtn = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { night } = props

  if (night) {
    return (
      <>
        <Grid
          _cursor
          center
          top="60%"
          width="65px"
          margin="3vw"
          position="absolute"
          _onClick={() => {
            clickSF.play()
            setIsOpen(true)
          }}
        >
          <img src={docs_w} alt="설명" />
          <Text color="#fff" margin="0" size="12px">
            게임 설명
          </Text>
        </Grid>
        {isOpen && <TutorialModal onClose={() => setIsOpen(false)} />}
      </>
    )
  }

  return (
    <>
      <Grid
        _cursor
        center
        top="60%"
        width="65px"
        margin="3vw"
        position="absolute"
        _onClick={() => {
          clickSF.play()
          setIsOpen(true)
        }}
      >
        <img src={docs} alt="설명" />
        <Text margin="0" size="12px">
          게임 설명
        </Text>
      </Grid>
      {isOpen && <TutorialModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default NewsBtn
