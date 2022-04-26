import styled from "styled-components"

function Friendlist(props){
    
    return(
        <Modalblack>
            <Modalwhite>

            </Modalwhite>
        </Modalblack>
    )
}
export const Modalblack = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  z-index: 5;
`;
export const Modalwhite = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 50%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  border-radius:20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
`;
export default Friendlist