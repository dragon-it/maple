import React, { useState } from "react";
import styled from "styled-components";
import event_Header_Img from "../../assets/pages/main/infoPanel/Event_header_img.png";
import Notice_Header_Img from "../../assets/pages/main/infoPanel/Event_header_img.png";

export const InfoPanel = ({ noticeData, eventData, error }) => {
  const calculateDday = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 0시로 맞춤
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0); // 종료일도 0시로 맞춤

    // 종료일까지 남은 일수 계산
    const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘까지";
    if (diffDays > 0) return `D-${diffDays}`;
    return "종료";
  };

  // 이벤트 데이터 처리
  const normalizedEventData = Array.isArray(eventData)
    ? eventData
    : eventData
    ? [eventData]
    : [];

  // D-day 타입 설정
  const getDdayType = (dDayText) => {
    if (dDayText === "오늘까지") return "today";
    if (dDayText === "종료") return "end";
    return "d";
  };

  // 1주일 이내인지 체크
  const isWithinAWeek = (dateStr) => {
    if (!dateStr) return false;
    const now = new Date();
    const date = new Date(dateStr);
    const diff = now - date;
    return diff <= 7 * 24 * 60 * 60 * 1000 && diff >= 0;
  };

  // noticeData 구조 분해
  const noticeList = noticeData?.notice?.notice || [];
  const updateList = noticeData?.noticeUpdate?.update_notice || [];
  const cashshopList = noticeData?.noticeCashshop?.cashshop_notice || [];

  // 필터링 및 합치기
  const mergedNotice = [
    ...noticeList.filter((n) => isWithinAWeek(n.date)),
    ...updateList.filter((n) => isWithinAWeek(n.date)),
    ...cashshopList.filter((n) => isWithinAWeek(n.date)),
  ];

  // 날짜 내림차순 정렬(최신순)
  mergedNotice.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 최대 5개만
  const displayNotice = mergedNotice.slice(0, 10);

  return (
    <Container>
      <NoticeWrap>
        <Header>
          <HeaderImg src={event_Header_Img} alt="이벤트" />
          <span>진행중인 이벤트</span>
        </Header>
        <List>
          {(normalizedEventData[0]?.event_notice || [])
            .filter((event) => event.date_event_end)
            .sort(
              (a, b) => new Date(a.date_event_end) - new Date(b.date_event_end)
            )

            .map((event) => {
              const ddayText = calculateDday(event.date_event_end);
              return (
                <ListItem key={event.notice_id}>
                  <DdayBadge type={getDdayType(ddayText)}>{ddayText}</DdayBadge>
                  <Link
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={event.title}
                  >
                    {event.title}
                  </Link>
                </ListItem>
              );
            })}
        </List>
      </NoticeWrap>
      <NoticeWrap>
        <Header>
          <HeaderImg src={event_Header_Img} alt="이벤트" />
          <span>정보센터</span>
        </Header>
        <List>
          {displayNotice.length ? (
            displayNotice.map((notice) => (
              <ListItem key={notice.notice_id}>
                <DateText>
                  {new Date(notice.date).toLocaleDateString("ko-KR")}
                </DateText>
                <Link
                  href={notice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={notice.title}
                >
                  {notice.title}
                </Link>
              </ListItem>
            ))
          ) : (
            <ListItem>공지 없음</ListItem>
          )}
        </List>
      </NoticeWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 450px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 550px;
  }
`;

const NoticeWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #25282b;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  flex: 1 1 0;
  min-width: 350px;
  max-width: 350px;
  height: fit-content;
  border-radius: 5px;
`;

const Header = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  padding: 3px;
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1px 0;
  height: 180px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  padding: 6px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  text-decoration: none;
  white-space: nowrap;
  color: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    text-decoration: underline;
  }
`;

const DdayBadge = styled.span`
  display: inline-block;
  min-width: 56px;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  background: ${({ type }) =>
    type === "today" ? "#ff3300" : type === "end" ? "#bdbdbd" : "#1976d2"};
  border-radius: 12px;
  padding: 1px 5px;
  margin-right: 8px;
  text-align: center;
`;

const HeaderImg = styled.img`
  height: 62px;
`;

const DateText = styled.span`
  min-width: 70px;
  color: #aaaaaa;
  font-size: 0.75rem;
`;
