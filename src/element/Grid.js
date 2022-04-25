import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex, width, height, margin, padding, bg, children, center, _onClick, flex, border,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    height : height,
    padding: padding,
    margin: margin,
    bg: bg,
    center: center,
    flex: flex,
    border: border,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  height: '100%',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  flex: "",
  border: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) =>
    props.border ? `border: 2px solid #ffb72b; border-radius: 10px;` : ""}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
    ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""}
    ${(props) => (props.center ? `text-align: center` : "")}
    ${(props) =>
    props.flex
      ? `position: relative; display: flex; justify-content: center; flex-direction: column;`
      : ""};
`;

export default Grid;
