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
  _onClick: () => {},
  flex: '',
  border: false,
  is_flex: false,
  flex_column: false,
  isFlex_start: false,
  isFlex_center: false,
  _cursor: false,
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow:${(props) => props.overflow};
  box-sizing: border-box;
  ${(props) =>
    props.border ? `border: 2px solid black; border-radius: 10px;` : ''}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
    ${(props) =>
      props.is_flex
        ? `display: flex; align-items: center; justify-content: space-between;`
        : ''}
    ${(props) => (props.center ? `text-align: center` : '')}
    ${(props) =>
      props.flex
        ? `position: relative; display: flex; justify-content: center; flex-direction: column;`
        : ''};
   ${(props) =>
     props.flex_column
       ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
       : null};
    ${(props) =>
      props.isFlex_start
        ? `display: flex; align-items: center; justify-content: start;`
        : null}
    ${(props) =>
      props.isFlex_center
        ? `display: flex; align-items: center; justify-content: center;`
        : null}
        ${(props) => (props._cursor ? `cursor: pointer;` : null)};
`

export default Grid
