import React from 'react'
import ModalPortal from './ModalPortal'
import { Grid, Button } from '../../element/index'
//모달 데스트
const Modal = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Grid>
        <Button _onClick={() => setIsOpen(true)}>Open Modal</Button>
        <ModalPortal open={isOpen} onClose={() => setIsOpen(false)}>
          모달이 열리네요... 그대가 들어오죠
        </ModalPortal>
      </Grid>
    </>
  )
}

export default Modal
