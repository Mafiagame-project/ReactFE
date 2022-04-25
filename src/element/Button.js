import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, children, margin, width, padding, size, bg } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    size : size,
    bg : bg,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>{text? text : children}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  margin: false,
  width: '',
  padding: false,
  size:'14px',
  bg:false,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  ${(props) => (props.margin? `margin: ${props.margin};` : "")}
  transition: 0.2s;
  
  
  &:hover {
    color: ${(props) => props.color};
  }
`;

export default Button;