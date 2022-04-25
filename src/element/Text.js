import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, font } = props;

  const styles = { bold: bold, color: color, size: size, margin, font: font, };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  font: false,
};

const P = styled.p`

  color: ${(props) => props.color};
  font-family: ${(props) => props.font};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Text;
