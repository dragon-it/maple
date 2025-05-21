import React from "react";
import styled from "styled-components";

export const InfoPanel = ({ noticeData, eventData, error }) => {
  const calculateDday = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 0시로 맞춤
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0); // 종료일도 0시로 맞춤

    const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘까지";
    if (diffDays > 0) return `D-${diffDays}`;
    return "종료";
  };

  // 배열 또는 단일 객체 처리
  const normalizedNoticeData = Array.isArray(noticeData)
    ? noticeData
    : noticeData
    ? [noticeData]
    : [];

  console.log(normalizedNoticeData);

  const normalizedEventData = Array.isArray(eventData)
    ? eventData
    : eventData
    ? [eventData]
    : [];

  const getDdayType = (dDayText) => {
    if (dDayText === "오늘까지") return "today";
    if (dDayText === "종료") return "end";
    return "d";
  };
  return (
    <Container>
      <NoticeWrap>
        <Header>공지 사항</Header>
        <List>
          {normalizedNoticeData.slice(0, 5).map((notice) => (
            <ListItem key={notice.notice_id}>
              <Link href={notice.url} target="_blank" rel="noopener noreferrer">
                {new Date(notice.date).toLocaleDateString("ko-KR")}{" "}
                {notice.title}
              </Link>
            </ListItem>
          ))}
        </List>
      </NoticeWrap>
      <NoticeWrap>
        <Header>진행중인 이벤트</Header>
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
                  >
                    {event.title}
                  </Link>
                </ListItem>
              );
            })}
        </List>
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
  background-color: #f0f0f0;
  overflow-y: auto;
`;

const Header = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
`;

const Link = styled.a`
  text-decoration: none;
  color: #0066cc;
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
  padding: 2px 10px;
  margin-right: 8px;
  text-align: center;
`;
