import React from 'react'
import { Grid, Text } from '../../element/index'
import ExitModal from '../modal/ExitModal'
import exit from '../../assets/icons/black/exit_game.png'
import exitWhite from '../../assets/icons/white/exit.png'
import { deniedSF } from '../../element/Sound'

const ExitBtn = (props) => {
  const [exitOpen, setExitOpen] = React.useState(false)
  const { night } = props

  if (night) {
    return (
      <>
        <Grid _cursor center width="65px" margin="3vw" position="absolute">
          <img
            src={exitWhite}
            alt="나가기"
            onClick={() => {
              deniedSF.play()
              setExitOpen(true)
            }}
          />
          <Text color="#fff" margin="0" size="12px">
            게임 종료
          </Text>
        </Grid>
        {exitOpen && <ExitModal onClose={() => setExitOpen(false)} />}
      </>
    )
  }
  return (
    <>
      <Grid _cursor center width="65px" margin="3vw" position="absolute">
        <img
          src={exit}
          alt="나가기"
          onClick={() => {
            deniedSF.play()
            setExitOpen(true)
          }}
        />
        <Text margin="0" size="12px">
          게임 종료
        </Text>
      </Grid>
      {exitOpen && <ExitModal onClose={() => setExitOpen(false)} />}
    </>
  )
}

export default ExitBtn
