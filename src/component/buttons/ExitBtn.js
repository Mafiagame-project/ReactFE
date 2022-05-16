import React from 'react'
import { Grid, Text } from '../../element/index'
import ExitModal from '../modal/ExitModal'
import exit from '../../assets/icons/black/exit_game.png'

const ExitBtn = () => {
  const [exitOpen, setExitOpen] = React.useState(false)

  return (
    <>
      <Grid center width="65px" margin="30px">
        <img
          src={exit}
          onClick={() => {
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
