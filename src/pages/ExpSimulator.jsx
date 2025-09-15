import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ExpInput } from "../components/expSimulator/ExpInput";

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
  margin: 5px 0;
  text-shadow: 0px 0px 7px rgb(38, 151, 185);
  color: rgb(255, 255, 255);
  font-weight: bold;
  position: relative;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`;

const Notice = styled.div`
  display: flex;
  gap: 2px;
  font-size: 13px;
  margin-top: 5px;
  color: rgb(192, 192, 192);
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
  height: auto;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid rgb(30, 38, 47);
  outline: 2px solid rgb(56, 87, 106);
  background-color: rgb(43, 53, 62);
  padding: 7px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
`;
