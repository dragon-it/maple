import React from "react";
import styled, { keyframes } from "styled-components";
import colors from "../color/colors";

export const Notice = ({ noticeData, isSunday }) => {
  // 일요일 기본 공지 텍스트
  const noticeText = isSunday
    ? "🎉썬데이 메이플 이벤트가 진행 중입니다. 이벤트 기간을 확인하시고 혜택을 꼭 챙기세요!🎉"
    : null;

  // 공지 텍스트 또는 데이터가 없으면 컴포넌트 숨김
  if (!noticeText && (!noticeData || !noticeData.event_notice)) {
    return null;
  }

  // 필요에 따라 noticeData에서 특정 공지 표시 가능
  const displayText =
    noticeText ||
    noticeData?.event_notice?.find((item) =>
      item.title.includes("썬데이 메이플")
    )?.title ||
    "활성화된 공지가 없습니다";

  return (
    <Container>
      <Marquee>{displayText}</Marquee>
    </Container>
  );
};

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-40%);
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: 27px;
  margin: 0;
  width: 100%;
  background-color: ${colors.main.dark3_1Alpha95};
`;

const Marquee = styled.div`
  white-space: nowrap;
  color: ${colors.headerColor.noticeText};
  animation: ${scroll} 20s linear infinite;
  padding: 5px 5px;

  &:hover {
    animation-play-state: paused;
  }
`;
