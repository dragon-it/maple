import React from "react";
import styled, { keyframes } from "styled-components";
import colors from "../color/colors";
import noticeTextData from "./NoticeText";

export const Notice = ({ isSunday, error }) => {
  // 일요일 기본 공지 텍스트
  const noticeText = error
    ? noticeTextData.apiError
    : isSunday
    ? noticeTextData.sundayMaple
    : null;

  // 일요일이 아니거나 공지 텍스트가 없으면 컴포넌트 숨김
  if (!noticeText) return null;

  return (
    <Container>
      <Marquee>{noticeText}</Marquee>
    </Container>
  );
};

const scrollAnimation = (start, end) => keyframes`
  0% {
    transform: translateX(${start});
  }
  100% {
    transform: translateX(${end});
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: 27px;
  width: 100%;
  background-color: ${colors.main.dark3_1Alpha95};
`;

const Marquee = styled.div`
  white-space: nowrap;
  color: ${colors.headerColor.noticeText};
  padding: 5px;

  animation: ${scrollAnimation("100%", "-40%")} 20s linear infinite;

  @media (max-width: 1280px) {
    animation: ${scrollAnimation("110%", "-60%")} 15s linear infinite;
  }

  @media (max-width: 768px) {
    animation: ${scrollAnimation("100%", "-160%")} 10s linear infinite;
  }

  &:hover {
    animation-play-state: paused;
  }
`;
