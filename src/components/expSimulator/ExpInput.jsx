import React from "react";
import styled from "styled-components";

export const ExpInput = () => {
  return (
    <>
      <ItemTitle>레벨</ItemTitle>
      <Level />
      <ItemTitle>경험치</ItemTitle>
      <Exp />
    </>
  );
};

const ItemTitle = styled.span``;

const Level = styled.input``;

const Exp = styled.input``;
