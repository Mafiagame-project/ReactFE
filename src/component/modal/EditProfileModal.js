import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Text, DotButton, Image } from '../../element/index'
import { actionCreators as memberActions } from '../../redux/modules/member'
import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import 마피양 from '../../assets/image/character/profile/profile02.png'
import 기자 from '../../assets/image/character/profile/profile04.jpeg'
import 경찰 from '../../assets/image/character/profile/profile03.png'
import 의사 from '../../assets/image/character/profile/profile05.png'
import pop from '../../assets/sound/effect/pop02.mp3'

const EditProfileModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const [getFile, setFile] = React.useState(null)
  const token = localStorage.getItem('token')
  const click = new Audio(pop)

  const [pictures, setPictures] = React.useState([
    { name: 마피양, info: '' },
    { name: 기자, info: '' },
    { name: 경찰, info: '' },
    { name: 의사, info: '' },
  ])

  const changeProfile = (pictureIdx, token) => {
    dispatch(memberActions.changeProfiles(pictureIdx, token))
  }

  const iconCheck = (element) => {
    click.play()
    element.info = 'orange'
  }
  return (
    <>
      <ModalPortal>
        <Background
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <Content onClick={(e) => e.stopPropagation()}>
            <Grid padding="30px" height="100%" flexColumn>
              <Text size="2vw" margin="1.5vw 0 0">
                {' '}
                아이콘 변경{' '}
              </Text>
              <Grid is_flex width="80%">
                {pictures.map((element, idx) => {
                  if (element.info.includes('orange')) {
                    element.info = ''
                    return (
                      <PictureBox
                        key={idx + 1}
                        style={{
                          width: '100px',
                          height: '100px',
                          border: `3px solid orange`,
                        }}
                        onClick={() => {
                          setFile(idx)
                          iconCheck(element)
                        }}
                      >
                        <Image src={element.name} size="100" />
                      </PictureBox>
                    )
                  } else {
                    return (
                      <PictureBox
                        key={idx + 1}
                        onClick={() => {
                          setFile(idx)
                          iconCheck(element)
                        }}
                      >
                        <Image src={element.name} />
                      </PictureBox>
                    )
                  }
                })}
              </Grid>
              <Grid marign="40px 0 0">
                <DotButton
                  _onClick={(e) => {
                    changeProfile(getFile, token)
                    e.stopPropagation()
                    onClose()
                    click.play()
                  }}
                  black01
                  text="저장"
                />
              </Grid>
            </Grid>
          </Content>
        </Background>
      </ModalPortal>
    </>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
`
const PictureBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  &:hover {
  }
`

const Content = styled.div`
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 999;
  height: 52vh;
  max-width: 48vw;
  width: 100%;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
`

export default EditProfileModal
