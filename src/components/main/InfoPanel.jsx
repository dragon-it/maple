import React from "react";
import styled from "styled-components";

export const InfoPanel = ({ noticeData, error }) => {
  console.log(noticeData, error);
  return (
    <Container>
      <NoticeWrap>
        <Header>공지 사항</Header>
      </NoticeWrap>
      <NoticeWrap>
        <Header>진행중인 이벤트</Header>
      </NoticeWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const NoticeWrap = styled.div`
  height: 30px;
  background-color: #f0f0f0;
`;

const Header = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
