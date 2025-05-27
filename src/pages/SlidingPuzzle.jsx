import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { SlidingPuzzleLogic } from "../components/slidingPuzzle/SlidingPuzzleLogic";

export const SlidingPuzzle = () => {
  return (
    <Container>
      <Helmet>
        <title>Exp 시뮬레이터 - 슬라이딩 퍼즐</title>
        <meta name="description" content="슬라이딩 퍼즐 게임입니다" />
      </Helmet>
      <SlidingPuzzleLogic />
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;
