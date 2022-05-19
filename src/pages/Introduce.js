import React from 'react'
import Header from '../component/Header'
import { Grid, Text, DotButton } from '../element/index'
import styled from 'styled-components'
import data from '../shared/introduce'
import Tutorial from './Tutorial'
import 돌아가기 from '../assets/icons/black/돌아가기.png'
import { history } from '../redux/configureStore'

function Introduce() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [getPage, setPage] = React.useState(0)

  const [getShow, setShow] = React.useState(false)
  const [desc, setDesc] = React.useState()
  const toggleBtn = () => {
    setIsOpen(!isOpen)
  }

  const seleted = (element, num) => {
    setDesc(element?.explain)
    setShow(true)
    setTimeout(()=>{
      setShow(false)
    },3000)
  }

  const box2 = {
    borderRadius:'10px',
    padding:'10px',
    border:`${getPage == 2 ? '3px solid black' : 'none'}`
  }
  const box1 = {
    borderRadius:'10px',
    padding:'10px',
    border:`${getPage == 1 ? '3px solid black' : 'none'}`
  }


  return (
    <>
      <Header />
      <img onClick={()=>{history.replace('/gamemain')}} style={{position:'absolute', margin:'15px'}} src={돌아가기}/>

      <Grid center flexColumn padding="50px">
          <Grid is_flex width='50%' height='55px'>
            <Grid isFlex_center height='60px' width='40%'>
              <TutorialBox style={box2}><Text _onClick={()=>{setPage(2)}} size="40px">역할 튜토리얼</Text></TutorialBox>
            </Grid>
            <Grid isFlex_center height='60px' width='40%'>
              <TutorialBox style={box1}><Text _onClick={()=>{setPage(1)}} size="40px">게임 튜토리얼</Text></TutorialBox>
            </Grid>
          </Grid>
        <Grid height='50px'></Grid>

        {
          getPage === 0
          ? null :
          getPage === 1 
          ? <Tutorial/>
          : getPage === 2
          ? <CardBox>
          {data.map((e, idx) => {
            return (
              <>
                <Card key={idx} onClick={()=>{seleted(e, idx+1)}}>
                  <Grid center height="10%">
                    <Text color="white">MAFIYANG</Text>
                  </Grid>
                  <Grid
                    flexColumn
                    padding="20px 60px 20px 60px"
                    center
                    bg="white"
                    height="100%"
                    _onlick={toggleBtn}
                  >
                    <Img src={e.img} />
                    <Grid isFlex_center height='50px' bg="#000">
                      <Text size='20px' color="#fff">{e.title}</Text>
                    </Grid>
                  </Grid>
                </Card>
                {/* <Grid>{e.explain}</Grid> */}
              </>
            )
          })}
        </CardBox>
        : null
        }
        <>
          {
            getShow == false
            ? null
            :<Grid isFlex_center margin='30px 0 0 0'>
              <Explain>
              <Text bold size='24px'>{desc}</Text>
              </Explain>
            </Grid>
          }
        </>
        
        {/* <Grid margin="20px 0 0 0" padding="30px" height="40%"></Grid> */}
      </Grid>
    </>
  )
}

const Img = styled.img`
  width: 150px;
`
const CardBox = styled.div`
  width: 80%;
  margin: 0 auto;
  overflow-x: scroll;
  display: flex;
  flex-direction: columns;
`

const Card = styled.div`
  box-sizing: border-box;
  width: 300px;
  min-width: 300px;
  height: 386px;
  background-color: black;
  border: 1.5px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover {
    border: 5px solid black;
  }
`

const Explain = styled.div`
width: 50%;
height: 86px;
background: #FFFFFF;
border: 2px solid #000000;
border-radius: 15px;
padding:20px;
`
const TutorialBox = styled.div`

`

export default Introduce
