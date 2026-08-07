import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ExpInput } from "../components/expSimulator/ExpInput";

export const ExpSimulator = () => {
  return (
    <Container>
      <Helmet>
        <title>EXP 시뮬레이터 - 메짱</title>
        <meta
          name="description"
          content="EXP 쿠폰, 비약 시뮬레이터 기능입니다."
        />
      </Helmet>
      <RenderingBox>
        <Header>EXP SIMULATOR</Header>
        <Notice>
          <Icon>❗</Icon>
          <span>수치상 오차범위가 생길 수 있습니다.</span>
        </Notice>
        <ExpInput />
      </RenderingBox>
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

const Header = styled.h1`
  width: 100%;
  margin: 2px 0 6px 0;
  font-size: 18px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
  text-align: left;
  letter-spacing: 0.05em;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.75);
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  width: 15px;
  height: 16px;
  text-align: center;
  border: 1px solid black;
  background: rgb(216, 216, 216);
  padding: 4px 5px 5px 5px;
  border-radius: 4px;
  font-size: 10px;
`;

const RenderingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
  height: auto;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  background: linear-gradient(
    135deg,
    rgba(32, 41, 52, 0.95),
    rgba(22, 29, 38, 0.95)
  );
  padding: 8px;
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;
