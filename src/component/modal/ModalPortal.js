import React from 'react'
import ReactDom from 'react-dom'

const ModalPortal = ({ children }) => {
  return ReactDom.createPortal(
    <div>{children}</div>,
    document.getElementById('portal'),
  )
}

export default ModalPortal
