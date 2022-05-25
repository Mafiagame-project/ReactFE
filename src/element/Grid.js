import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {
  const { children, _onClick, ...styles } = props

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  )
}

Grid.defaultProps = {
  children: null,

  width: '100%',
  margin: false,
  bg: false,
  center: false,
  isStart: false,
  _onClick: () => {},
  flex: '',
  border: false,
  borderRight: false,
  borderBottom: false,
  borderLeft: false,
  is_flex: false,
  column: false,
  flex_column: false,
  flexColumn: false,
  flexColumn_end: false,
  isFlex_start: false,
  isFlex_center: false,
  isFlex_end: false,
  _cursor: false,
  br: '',
  position: false,
  top: false,
  right: false,
  left: false,
  bottom: false,
  isDisplay: false,
  justify_item: false,
  fc: false,
  fs: false,
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow:${(props) => props.overflow};
  position:${(props) => props.position};
  top:${(props) => props.top};
  left:${(props) => props.left};
  right:${(props) => props.right};
  bottom:${(props) => props.bottom};
  display:${(props) => props.isDisplay};
  justify-items: ${(props) => props.justify_item};
  box-sizing: border-box;
  ${(props) =>
    props.border ? `border: 2px solid black; border-radius: 10px;` : ''}
  ${(props) => (props.borderRight ? `border-right: 2px solid black;` : '')}
  ${(props) => (props.borderLeft ? `border-left: 2px solid black;` : '')}
  ${(props) => (props.borderBottom ? `border-bottom: 2px solid black;` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
    ${(props) =>
      props.is_flex
        ? `display: flex; align-items: center; justify-content: space-between;`
        : ''}
    ${(props) => (props.center ? `text-align: center` : '')}
    ${(props) => (props.isStart ? `text-align: start` : '')}
    ${(props) =>
      props.flex
        ? `position: relative; display: flex; justify-content: center; flex-direction: column;`
        : ''};
    ${(props) => (props.column ? `flex-direction: column;` : null)};
   ${(props) =>
     props.flex_column
       ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
       : null};
       ${(props) =>
         props.flexColumn
           ? `display: flex; flex-direction: column; justify-content: space-between; align-items: center;`
           : null};
           ${(props) =>
             props.flexColumn_end
               ? `display: flex; flex-direction: column; justify-content: end; align-items: center;`
               : null};
    
    ${(props) =>
      props.isFlex_start
        ? `display: flex; align-items: center; justify-content: start;`
        : null}
    ${(props) =>
      props.isFlex_center
        ? `display: flex; align-items: center; justify-content: center;`
        : null}
    ${(props) =>
      props.isFlex_end
        ? `display: flex; align-items: center; justify-content: end;`
        : null}
    ${(props) => (props._cursor ? `cursor: pointer;` : null)};
    ${(props) => (props.fc ? `display: flex; flex-direction: column;` : null)};
    ${(props) => (props.fs ? `display: flex; justify-content: start;` : null)};
`

export default Grid
