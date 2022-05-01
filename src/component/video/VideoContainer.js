import react from 'React'
import styled from 'styled-components'

const VideoContainer = () => {
    return(
        <CircleContainer>
            <Circle>
             
            </Circle>
            <ul>

            </ul>
        </CircleContainer>
    )
}

const CircleContainer = styled.div`
position: relative;
display: flex;
place-items: center;
width: 50vw;
height: 100%;
margin: 0 auto;

`

const Circle = styled.div`
position: absolute;
top:50%;
left: 50%;
tramsform: translate(-50%, -50%);
z-index: -1
`