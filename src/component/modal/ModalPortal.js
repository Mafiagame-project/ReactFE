import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

const ModalPortal = ({ open, children, onClose }) => {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <OverRay />
      <Modal>
        <button onClick={onClose}>Close Modal</button>
        {children}
      </Modal>
    </>,
    document.getElementById('portal'),
  )
}

const OverRay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  width: 500px;
  height: 200px;
  text-align: center;
  border-radius: 30px;
  z-index: 1000;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export default ModalPortal
