import React from "react";
import styled, { css } from "styled-components";

export const ContainerBox = ({ children, ...props }) => {
  return <Wrap {...props}>{children}</Wrap>;
};

export const ContainerCss = css`
  background: linear-gradient(
    180deg,
    rgba(57, 70, 81, 0.97) 0%,
    rgba(46, 55, 62, 0.97) 9%,
    rgba(44, 51, 58, 0.97) 100%
  );
  border: 1px solid #4f606b;
  border-radius: 7px;
  outline: 1px solid #242b33;
`;

export const SkillDetailContainerCss = css`
  background: rgba(29, 29, 29, 0.97);
  border: 1px solid #979797;
  border-radius: 7px;
  outline: 1px solid #242b33;
`;

export const SkillContainerCss = css`
  border: 1px solid rgb(93, 111, 119);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(47, 52, 60, 0.9);
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 7px;
  width: 100%;
  font-size: 12px;
  ${SkillContainerCss}
`;
