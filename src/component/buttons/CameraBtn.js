import React from 'react'
import styled from 'styled-components'
import cameraOn from '../../assets/icons/black/camera_on.png'
import cameraOff from '../../assets/icons/black/camera_off.png'

const CameraBtn = (props) => {
  if (props.cameraOn) {
    return (
      <Btn display={props.display}>
        <img src={cameraOn} alt="on" onClick={props.VideoHandler} />
      </Btn>
    )
  } else {
    return (
      <Btn display={props.display}>
        <img src={cameraOff} alt="off" onClick={props.VideoHandler} />
      </Btn>
    )
  }
}

const Btn = styled.div`
  cursor: pointer;
  width: 25%;
  height: 25%;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: 50%;
  background-color: #aaa;
  transform: translateX(-50%);
  ${(props) => (props.display ? 'display: block' : 'display: none')};
  img {
    width: 28px;
    height: 27px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`

export default CameraBtn
