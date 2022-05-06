import Header from "../component/Header"
import {Grid, Text, Button} from '../element/index'  
import styled from "styled-components"
import data from '../shared/introduce';

function Introduce(){
    return(
        <>
        <Header/>
        <Grid padding='50px' center width='100vw' height='90vh'>
            <Grid height='5%'>
                <Text bold size='32px'>역할 튜토리얼</Text>
            </Grid>
            <Grid height='5%'>
                <Text bold size='16px'>역할을 선택해주세요</Text>
            </Grid>
            <Grid is_flex height='40%'>
            {
                data.map(e => {
                    return(
                        <Card>
                            <Grid center height='15%'>
                                <Text color='white'>MAFIYANG</Text>
                            </Grid>
                            <Grid padding='20px 60px 20px 60px' center bg='white' height='100%'></Grid>
                        </Card>
                    )
                })
            }
            </Grid>
            <Grid margin='20px 0 0 0' padding='30px' height='40%'>
                <Grid border>

                </Grid>
            </Grid>
        </Grid>
        </>
    )
}
const Card = styled.div`
  width: 300px;
  min-width: 300px;
  height: 386px;
  background-color: black;
  border:1px solid black;
  border-radius: 50px 50px 0px 0px;
  margin-right: 20px;
  box-shadow: 3px 3px 1px 1px gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: 200px;
    margin-bottom: 20px;
  }
  &:hover{  
    border:5px solid black;
  }
`
export default Introduce