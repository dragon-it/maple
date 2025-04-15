import React from "react";
import colors from "../color/colors";
import styled from "styled-components";

export const ItemDetailContainer = ({ text }) => {
  return <Container>{text}</Container>;
};

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.main.dark0};
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  line-height: 16px;
  color: ${colors.main.white0};
  padding: 0px 10px 10px 10px;
  width: 350px;
  max-height: 600px;

  font-family: "돋움";
  z-index: 1000;

  @media screen and (max-width: 380px) {
    max-width: 292px;
  }

  @media screen and (max-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(
      139deg,
      ${colors.main.white0Alpha90} 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
  }
`;
