import styled, { css } from "styled-components";
import event_Header_Img from "../../assets/pages/main/infoPanel/Event_header_img.png";
import Notice_Header_Img from "../../assets/pages/main/infoPanel/Notice_header_img2.png";
import { useNavigate } from "react-router-dom";
import colors from "../common/color/colors";
import { useNoticeEvent } from "../../context/NoticeEventContext";

export const InfoPanel = () => {
  const { eventData, noticeData, loading, error } = useNoticeEvent();
  const navigate = useNavigate();
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
    if (/^D-[1-7]$/.test(dDayText)) return "week";
    return "d";
  };

  // 2주일 이내인지 체크
  const isWithinAWeek = (dateStr) => {
    if (!dateStr) return false;
    const now = new Date();
    const date = new Date(dateStr);
    const diff = now - date;
    return diff <= 14 * 24 * 60 * 60 * 1000 && diff >= 0;
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

  // 최대 10개만
  const displayNotice = mergedNotice.slice(0, 10);

  // 날짜 포맷팅 함수
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return `${year}.${month}.${date}`;
  };

  return (
    <Container $error={error}>
      {error ? (
        <></>
      ) : (
        <NoticeWrap>
          <Header>
            <HeaderLeft>
              <HeaderIconWrap>
                <HeaderImg src={event_Header_Img} alt="이벤트" />
              </HeaderIconWrap>
              <HeaderTitleGroup>
                <TitleMain>진행중인 이벤트</TitleMain>
                <TitleSub>Current Events</TitleSub>
              </HeaderTitleGroup>
            </HeaderLeft>
            <HeaderLink
              href="https://maplestory.nexon.com/News/Event"
              target="_blank"
              rel="noopener noreferrer"
            >
              전체보기 <span>&rsaquo;</span>
            </HeaderLink>
          </Header>
          <List>
            {loading ? (
              <ErrorText>
                <p>로딩 중...</p>
              </ErrorText>
            ) : (
              (normalizedEventData[0]?.event_notice || [])
                .filter((event) => event.date_event_end)
                .sort(
                  (a, b) =>
                    new Date(a.date_event_end) - new Date(b.date_event_end)
                )
                .map((event) => {
                  const ddayText = calculateDday(event.date_event_end);
                  return (
                    <ListItem key={event.notice_id}>
                      <DdayBadge $type={getDdayType(ddayText)}>
                        {ddayText}
                      </DdayBadge>
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
                })
            )}
          </List>
        </NoticeWrap>
      )}

      <NoticeWrap>
        <Header>
          <HeaderLeft>
            <HeaderIconWrap>
              <HeaderImg src={Notice_Header_Img} alt="정보센터" />
            </HeaderIconWrap>
            <HeaderTitleGroup>
              <TitleMain>정보센터</TitleMain>
              <TitleSub>Notices &amp; Patch Notes</TitleSub>
            </HeaderTitleGroup>
          </HeaderLeft>
          <HeaderLink
            href="https://maplestory.nexon.com/News/Notice"
            target="_blank"
            rel="noopener noreferrer"
          >
            전체보기 <span>&rsaquo;</span>
          </HeaderLink>
        </Header>
        <List>
          {loading ? (
            <ErrorText>
              <p>로딩 중...</p>
            </ErrorText>
          ) : displayNotice.length > 0 ? (
            displayNotice.map((notice) => (
              <ListItem key={notice.notice_id}>
                <DateText>{formatDate(notice.date)}</DateText>
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
          ) : error ? (
            <ErrorText>
              <p>현재 API 점검중입니다.</p>
              <RecommendText
                onClick={() => navigate("/sliding-puzzle")}
                tabIndex={0}
                role="button"
                aria-label="슬라이딩 퍼즐로 이동"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate("/sliding-puzzle");
                }}
              >
                <p>기다리는 동안</p>
                <strong>&nbsp;슬라이딩 퍼즐&nbsp;</strong>
                <p>어때요?</p>
              </RecommendText>
            </ErrorText>
          ) : null}
        </List>
      </NoticeWrap>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  margin: 48px auto 0 auto;
  box-sizing: border-box;
`;

const NoticeWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    rgb(49 60 70 / 94%) 0%,
    rgb(40 48 55 / 88%) 9%,
    rgb(38 44 50 / 86%) 100%
  );
  border: 1px solid rgb(79, 96, 107);
  outline: rgb(36, 43, 51) solid 1px;
  border-radius: 16px;
  width: 564px;
  max-width: 100%;
  padding: 8px;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 10px 24px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media screen and (max-width: 500px) {
    padding: 8px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;

  @media screen and (max-width: 500px) {
    margin-bottom: 12px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

`;

const HeaderIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

`;

const HeaderImg = styled.img`
  width: auto;

  transform: scaleX(-1);

  @media screen and (max-width: 500px) {
    height: 26px;
  }
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleMain = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(220, 252, 2);
  text-shadow: rgba(0, 0, 0, 0.35) 0px 0px 8px;
  margin: 0;
  letter-spacing: -0.3px;

  @media screen and (max-width: 500px) {
    font-size: 0.95rem;
  }
`;

const TitleSub = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 2px 0 0 0;

  @media screen and (max-width: 500px) {
    font-size: 0.68rem;
  }
`;

const HeaderLink = styled.a`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary, oklch(0.72 0.16 285));
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s ease;

  &:hover {
    color: oklch(0.78 0.18 285);
    text-decoration: underline;
  }

  span {
    font-size: 1.1rem;
    line-height: 1;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.78rem;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 10px 14px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.16);
  }

  @media screen and (max-width: 500px) {
    padding: 8px 10px;
    gap: 8px;
    font-size: 0.8rem;
    border-radius: 10px;
  }
`;

const ErrorText = styled.span`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  color: rgba(255, 255, 255, 0.6);
`;

const Link = styled.a`
  text-decoration: none;
  color: var(--foreground, rgba(255, 255, 255, 0.95));
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  flex: 1 1 0;
  min-width: 0;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const DdayBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 82px;
  font-size: 0.825rem;
  font-weight: 700;
  border-radius: 6px;
  flex-shrink: 0;
  box-sizing: border-box;
  
  ${({ $type }) =>
    $type === "today" &&
    css`
      background-color: rgba(244, 63, 94, 0.75);
      color: #ffffff;
      border: 1px solid rgba(251, 113, 133, 0.6);
    `}

  ${({ $type }) =>
    $type === "week" &&
    css`
      background-color: rgba(245, 158, 11, 0.75);
      color: #ffffff;
      border: 1px solid rgba(252, 211, 77, 0.6);
    `}

  ${({ $type }) =>
    $type === "d" &&
    css`
      background-color: rgba(59, 130, 246, 0.75);
      color: #ffffff;
      border: 1px solid rgba(147, 197, 253, 0.6);
    `}

  ${({ $type }) =>
    $type === "end" &&
    css`
      background-color: rgba(107, 114, 128, 0.7);
      color: #f3f4f6;
      border: 1px solid rgba(156, 163, 175, 0.5);
    `}
`;

const DateText = styled.span`
  min-width: 70px;
  color: #a0a5b5;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const RecommendText = styled.p`
  width: 90%;
  margin: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  text-shadow: rgb(30, 38, 47) 0px 0px 3px;
  font-weight: bold;
  background: ${({ theme }) => theme.infoPanelColor.toPuzzle.background};
  border-top: ${({ theme }) => theme.infoPanelColor.toPuzzle.borderTop};
  outline: ${({ theme }) => theme.infoPanelColor.toPuzzle.outline};
  box-shadow: ${({ theme }) => theme.infoPanelColor.toPuzzle.boxShadow};
  min-width: max-content;
  max-width: 100%;

  strong {
    color: ${colors.main.dark6};
    text-shadow: rgb(151, 151, 151) 0px 0px 3px;
  }

  &:hover {
    filter: brightness(1.1);
  }

  @media screen and (max-width: 768px) {
    padding: 4px 6px;
    margin-top: 10px;
    flex-direction: column;
    height: auto;
  }
`;
