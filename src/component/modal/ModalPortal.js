import React from 'react'
import ReactDom from 'react-dom'

const ModalPortal = ({ children }) => {
  return ReactDom.createPortal(
    <div>{children}</div>,
    document.getElementById('portal'),
  )
}

// const OverRay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.4);
//   z-index: 1000;
// `

// const Modal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: #fff;
//   padding: 30px;
//   text-align: center;
//   border-radius: 30px;
//   z-index: 1000;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   ${(props) => (props.width ? `width: ${props.width};` : `width: 400px`)};
//   ${(props) => (props.height ? `height: ${props.height};` : `height: 400px`)};
// `

export default ModalPortal
