import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

export const ExpSimulator = () => {
  return (
    <Container>
      <Helmet>
        <title>Exp 시뮬레이터 - 메짱</title>
        <meta
          name="description"
          content="Exp 쿠폰, 비약 시뮬레이터 기능입니다."
        />
      </Helmet>
    </Container>
  );
};

const Container = styled.div``;
