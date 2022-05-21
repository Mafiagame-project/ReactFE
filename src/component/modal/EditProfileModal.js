import React from 'react'
import { history } from '../../redux/configureStore'
import ModalPortal from './ModalPortal'
import { Grid, Text, DotButton, Input, Image } from '../../element/index'
import { actionCreators as memberActions } from '../../redux/modules/member'
import styled from 'styled-components'
import 마피양 from '../../assets/image/character/profile.jpg'
import 기자 from '../../assets/image/character/양_기자.png'
import 경찰 from '../../assets/image/character/경찰.png'
import 의사 from '../../assets/image/character/의사_양.png'
import { useDispatch } from 'react-redux'


const EditProfileModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [getFile, setFile] = React.useState(null);
  const token = localStorage.getItem('token')

  const [pictures, setPictures] = React.useState( [
    {name : 마피양, info : ''},
    {name : 기자, info : ''},
    {name : 경찰, info : ''},
    {name : 의사, info: ''}
  ])

  const changeProfile = (pictureIdx, token) => {
    dispatch(memberActions.changeProfiles(pictureIdx, token));
  }

  const iconCheck = (element) => {
    console.log(element)
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
            <Grid padding="30px" height="100%" flex_column>
              <Text> 아이콘 변경 </Text>
              <Grid is_flex width='100%'>
                {
                  pictures.map((element, idx) => {
                    if(element.info.includes('orange')){
                      element.info = ''
                      return(
                        <PictureBox style={{border:`3px solid orange`}} onClick={()=>{setFile(idx); iconCheck(element)}}><Image src={element.name} /></PictureBox>
                      )
                    } else {
                      return(
                        <PictureBox style={{border:`1px solid gray`}} onClick={()=>{setFile(idx); iconCheck(element)}}><Image src={element.name} /></PictureBox>
                      )
                    }
                    
                  })
                }
              </Grid>
              <Grid marign="40px 0 0">
                <DotButton _onClick={(e)=>{changeProfile(getFile, token); e.stopPropagation(); onClose()}} black01 text="저장" />
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
  width:100px;
  height:100px;
  border-radius:50%;
  border:1px solid gray;
  margin:10px;
  &:hover{
    border : 3px solid gray;
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
  height: 600px;
  max-width: 600px;
  width: 100%;
  background-color: #eee;
  position: relative;
  border-radius: 10px;
`

export default EditProfileModal
