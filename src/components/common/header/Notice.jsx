import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import colors from "../color/colors";
import axios from "axios";

export const Notice = () => {
  const [noticeText, setNoticeText] = useState(null);

  useEffect(() => {
    const fetchSundayMapleStatus = async () => {
      try {
        const response = await axios.get("/notice-event", {
          headers: {
            "x-nxopen-api-key": process.env.REACT_APP_API_KEY,
          },
        });

        if (response.status === 200) {
          const sundayMapleEvent = response.data.event_notice.find((item) =>
            item.title.includes("썬데이 메이플")
          );

          if (sundayMapleEvent) {
            const eventEndTime = new Date(sundayMapleEvent.date_event_end);
            const currentTime = new Date();

            if (eventEndTime > currentTime) {
              setNoticeText(
                "썬데이 메이플 이벤트가 진행 중입니다. 이벤트 기간을 확인하시고 혜택을 꼭 챙기세요!"
              );
            } else {
              setNoticeText(null);
            }
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setNoticeText("현재 API 점검 중입니다.");
        } else {
          setNoticeText(null);
        }
      }
    };

    // 일요일인지 확인
    const isSunday = new Date().getDay() === 0;
    if (isSunday) {
      setNoticeText(
        "썬데이 메이플 이벤트가 진행 중입니다. 이벤트 기간을 확인하시고 혜택을 꼭 챙기세요!"
      );
    } else {
      fetchSundayMapleStatus();
    }
  }, []);

  // 텍스트가 없으면 컴포넌트 숨김
  if (!noticeText) {
    return null;
  }

  return (
    <Container>
      <Marquee>{noticeText}</Marquee>
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
  height: 37px;
  margin: 0;
  padding: 10px 5px;
  width: 100%;
  background-color: ${colors.main.dark3_1Alpha95};
`;

const Marquee = styled.div`
  white-space: nowrap;
  color: ${colors.headerColor.noticeText};
  animation: ${scroll} 15s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;
