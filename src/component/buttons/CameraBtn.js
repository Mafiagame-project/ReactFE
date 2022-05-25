import React from 'react'
import styled from 'styled-components'
import cameraOn from '../../assets/icons/white/camera_on.png'
import cameraOff from '../../assets/icons/white/camera_off.png'
import audioOn from '../../assets/icons/white/마이크.png'
import audioOff from '../../assets/icons/white/마이크_off.png'

const CameraBtn = (props) => {
  return (
    <Btn display={props.display}>
      {props.cameraOn ? (
        <img
          src={cameraOn}
          className="camera"
          alt="on"
          onClick={props.VideoHandler}
        />
      ) : (
        <img
          src={cameraOff}
          className="camera"
          alt="off"
          onClick={props.VideoHandler}
        />
      )}
      {props.audioOn ? (
        <img
          src={audioOn}
          alt="on"
          className="audio"
          onClick={props.AudioHandler}
        />
      ) : (
        <img
          src={audioOff}
          alt="off"
          className="audio"
          onClick={props.AudioHandler}
        />
      )}
    </Btn>
  )
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
  .camera {
    width: 3vw;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .audio {
    width: 3vw;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`

export default CameraBtn
