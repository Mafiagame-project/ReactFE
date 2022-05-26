import React from 'react'
import { Grid, Text } from '../../element/index'
import NewspaperModal from '../modal/NewspaperModal'
import docs from '../../assets/icons/black/docs.png'
import { clickSF } from '../../element/Sound'

const NewsBtn = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Grid
        _cursor
        center
        top="70%"
        width="65px"
        margin="3vw"
        position="absolute"
        _onClick={() => {
          clickSF.play()
          setIsOpen(true)
        }}
      >
        <img src={docs} alt="기사" />
        <Text margin="0" size="12px">
          기사 읽기
        </Text>
      </Grid>
      {isOpen && <NewspaperModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default NewsBtn
