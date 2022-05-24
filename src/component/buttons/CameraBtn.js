import React from 'react'
import styled from 'styled-components'
import cameraOn from '../../assets/icons/white/camera_on.png'
import cameraOff from '../../assets/icons/white/camera_off.png'

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
  width: 10.56vw;
  height: 10.56vw;
  position: absolute;
  top: 0;
  left: 11.2%;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.7;
  img {
    width: 3vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`

export default CameraBtn
