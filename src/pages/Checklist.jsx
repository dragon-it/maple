import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { ChecklistShell } from "../components/checklist/ChecklistShell";

export const Checklist = () => {
  return (
    <PageWrap>
      <Helmet>
        <title>{`체크리스트 - 메짱`}</title>
        <meta
          name="description"
          content="보스 수익 계산과 기간 만료 체크 기능을 제공합니다."
        />
      </Helmet>
      <ChecklistShell />
    </PageWrap>
  );
};

const PageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 12px;
  }
`;
